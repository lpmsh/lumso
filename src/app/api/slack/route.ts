import { NextRequest, NextResponse } from "next/server";
import { pinecone } from "@/lib/pinecone";

import { IncomingPayload } from "@/lib/types";
import { nanoid } from "nanoid";

import { classifyQuestionOrStatement } from "@/lib/huggingface";
import { slack } from "@/lib/slack";
import { generateResponse } from "@/lib/ai";

export async function POST(req: NextRequest) {
  // add verification/signing check later
  const data = (await req.json()) as IncomingPayload;

  console.log(data.event_id);

  const index = pinecone
    .index(
      "messages",
      "https://messages-8tb7xb4.svc.aped-4627-b74a.pinecone.io"
    )
    .namespace("messages");

  switch (data.event.type) {
    // HF classifier shahrukhx01/question-vs-statement-classifier
    case "message":
      const output = await classifyQuestionOrStatement(data.event.text);

      const messageIsQuestion = output[0].label === "LABEL_1";

      if (messageIsQuestion) {
        const response = await index.searchRecords({
          query: {
            topK: 3,
            inputs: { text: data.event.text },
          },
        });

        const responseMsg = await generateResponse({
          question: data.event.text,
          // @ts-ignore
          hits: response.result.hits.map((h) => h.fields.text),
        });

        // reply to message in thread
        await slack.chat.postMessage({
          channel: data.event.channel,

          markdown_text: responseMsg,
          thread_ts: data.event.ts, // this option replies to the passed in message
        });
      }

      // Upsert the records into a namespace
      const res = await index.upsertRecords([
        {
          _id: nanoid(),
          text: data.event.text,
          isQuestion: messageIsQuestion,
          message_ts: data.event.ts,
        },
      ]);
      break;

    case "message_deleted":
      await index.deleteMany({
        ts: { $eq: data.event.ts },
      });
      break;
    default:
      break;
  }

  return new NextResponse(null, {
    status: 200,
  });
}
