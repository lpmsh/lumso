import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

export async function generateResponse({
  question,
  hits,
}: {
  question: string;
  hits: string[];
}) {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });
  const result = await generateText({
    model: openrouter("meta-llama/llama-3.3-8b-instruct:free"),
    prompt: `You answer questions in a slack organization and serve as a living knowledge base. You'll receive a question or query as well as embeddings/closest vectors of previous messages to give you context to answer the question or query. Provide absolutely ZERO answers that are not from the related messages you will be provided. Literally only respond with information from related messages you'll be provided. Be concise while still being grammatically correct, using sentences, and providing as much context as possible. Make sure you only provide information based on the context you're given, don't assume anything. Question: ${question} Similar Messages (Vector Search Hits): ${hits.join(
      ", "
    )}`,
  });

  return result.text
}
