import { FunctionToolCallArgumentsDeltaEvent } from "openai/lib/ChatCompletionStream";

export const purchase = (tool: FunctionToolCallArgumentsDeltaEvent) => {
  const args = JSON.parse(tool.arguments);
  const customChunk = {
    choices: [],
    signal: {
      type: "product_purchase",
      data: [args],
    },
  };

  return JSON.stringify(customChunk);
};
