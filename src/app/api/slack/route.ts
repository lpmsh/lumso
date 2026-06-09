import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { pinecone } from "@/lib/pinecone";

import { IncomingPayload } from "@/lib/types";
import { nanoid } from "nanoid";

import { classifyQuestionOrStatement } from "@/lib/huggingface";
import { slack } from "@/lib/slack";
import { generateResponse } from "@/lib/ai";

// Acknowledge Slack within its 3 second window, otherwise it redelivers the
// same event (up to 3 retries) and the bot answers more than once.
const ok = () => new NextResponse(null, { status: 200 });

export async function POST(req: NextRequest) {
  // add verification/signing check later

  // Slack retries an event when it doesn't receive a 200 fast enough. The
  // original delivery is already being handled, so ignoring retries here is
  // what stops the bot from replying twice. Retries carry this header.
  if (req.headers.get("x-slack-retry-num")) {
    return ok();
  }

  const data = await req.json();

  // Handle Slack URL verification challenge
  if (data.type === "url_verification") {
    return NextResponse.json({ challenge: data.challenge });
  }

  const payload = data as IncomingPayload;

  console.log(payload.event_id);

  if (!payload.event.type) {
    return ok();
  }

  // Acknowledge immediately and do the slow work (classification, vector
  // search, generation, posting) after the response is sent. Returning 200
  // right away keeps Slack from retrying and double-firing the event.
  after(() => processEvent(payload));

  return ok();
}

async function processEvent(payload: IncomingPayload) {
  const index = pinecone
    .index(
      "messages",
      "https://messages-8tb7xb4.svc.aped-4627-b74a.pinecone.io",
    )
    .namespace("messages");

  switch (payload.event.type) {
    // HF classifier shahrukhx01/question-vs-statement-classifier
    case "message":
      // Skip the bot's own replies and other non-user messages (edits,
      // deletions, etc.) so it never reacts to or indexes its own posts.
      if (
        payload.event.subtype ||
        payload.event.bot_id ||
        payload.event.app_id
      ) {
        return;
      }

      const output = await classifyQuestionOrStatement(payload.event.text);

      const messageIsQuestion = output[0].label === "LABEL_1";

      if (messageIsQuestion) {
        const response = await index.searchRecords({
          query: {
            topK: 3,
            inputs: { text: payload.event.text },
          },
        });

        const responseMsg = await generateResponse({
          question: payload.event.text,
          // @ts-ignore
          hits: response.result.hits.map((h) => h.fields.text),
        });

        // reply to message in thread
        await slack.chat.postMessage({
          channel: payload.event.channel,

          markdown_text: responseMsg,
          thread_ts: payload.event.ts, // this option replies to the passed in message
        });
      }

      // Upsert the records into a namespace
      await index.upsertRecords([
        {
          _id: nanoid(),
          text: payload.event.text,
          isQuestion: messageIsQuestion,
          message_ts: payload.event.ts,
        },
      ]);
      break;

    case "message_deleted":
      await index.deleteMany({
        ts: { $eq: payload.event.ts },
      });
      break;
    default:
      break;
  }
}
