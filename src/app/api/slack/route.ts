import { NextRequest, NextResponse } from "next/server";
import { pinecone } from "@/lib/pinecone";

import { IncomingPayload } from "@/lib/types";
import { nanoid } from "nanoid";

import { classifyQuestionOrStatement } from "@/lib/huggingface";
import { slack } from "@/lib/slack";
import { generateResponse } from "@/lib/ai";

export async function POST(req: NextRequest) {
  // add verification/signing check later
  const data = await req.json();

  // Handle Slack URL verification challenge
  if (data.type === "url_verification") {
    return NextResponse.json({ challenge: data.challenge });
  }

  const payload = data as IncomingPayload;

  console.log(payload.event_id);

  const index = pinecone
    .index(
      "messages",
      "https://messages-8tb7xb4.svc.aped-4627-b74a.pinecone.io",
    )
    .namespace("messages");

  if (!payload.event.type) {
    return new NextResponse(null, {
      status: 200,
    });
  }

  switch (payload.event.type) {
    // HF classifier shahrukhx01/question-vs-statement-classifier
    case "message":
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
      const res = await index.upsertRecords([
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

  return new NextResponse(null, {
    status: 200,
  });
}
