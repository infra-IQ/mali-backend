import { FunctionToolCallArgumentsDeltaEvent } from "openai/lib/ChatCompletionStream";
import { ChatCompletionChunk } from "openai/resources";
import { getOrders } from "./function-as-code/get-orders";
import { purchase } from "./function-as-code/purchase.code";


type Signal = {
  choices: ChatCompletionChunk[];
  signal: {
    type: string;
    data: any;
  }
};

export function executor(tool: FunctionToolCallArgumentsDeltaEvent): string {
  switch (tool.name) {
    case "getOrders":
      return getOrders();
    case "purchase":
      return purchase(tool);
    default:
      throw new Error("Function not found");
  }
}
