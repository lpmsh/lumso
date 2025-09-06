import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HF_TOKEN);

export async function classifyQuestionOrStatement(text: string) {
  const output = await hf.textClassification({
    model: "shahrukhx01/question-vs-statement-classifier",
    inputs: text,
    provider: "hf-inference",
  });

  return output;
}
