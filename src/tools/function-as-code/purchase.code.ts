import { FunctionToolCallArgumentsDeltaEvent } from "openai/lib/ChatCompletionStream";

export const purchase = (tool: FunctionToolCallArgumentsDeltaEvent) => {
  const args = JSON.parse(tool.arguments);

  return JSON.stringify({
    choices: [],
    signal: {
      type: "product_purchase",
      data: [args],
    },
  });
};
