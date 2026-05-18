import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HF_TOKEN);

// The BERT-based classifier has a 512 token limit.
// Truncate to ~1500 chars (~400 tokens) to stay safely within bounds.
const MAX_CLASSIFIER_CHARS = 1500;

// function to classify a message as a question or not
export async function classifyQuestionOrStatement(text: string) {
  const truncated =
    text.length > MAX_CLASSIFIER_CHARS
      ? text.slice(0, MAX_CLASSIFIER_CHARS)
      : text;

  const output = await hf.textClassification({
    model: "shahrukhx01/question-vs-statement-classifier",
    inputs: truncated,
    provider: "hf-inference",
  });

  return output;
}
