import { FunctionToolCallArgumentsDeltaEvent } from "openai/lib/ChatCompletionStream";
import { getOrders } from "./function-as-code/get-orders";
import { purchase } from "./function-as-code/purchase.code";

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
