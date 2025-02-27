import { FunctionToolCallArgumentsDeltaEvent } from "openai/lib/ChatCompletionStream";
import { getMyRecentOrders } from "./function-as-code/get-recent-order.code";
import { purchase } from "./function-as-code/purchase.code";

export function executor(functionName: FunctionToolCallArgumentsDeltaEvent): string {
  switch (functionName.name) {
    case "getMyRecentOrders":
      return getMyRecentOrders();
    case "purchase":
      return purchase();
    default:
      throw new Error("Function not found");
  }
}
