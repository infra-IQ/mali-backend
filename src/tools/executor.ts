import { getMyRecentOrders } from "./function-as-code/get-recent-order.code";
import { purchase } from "./function-as-code/purchase.code";

export function executor(functionName: "getMyRecentOrders" | "purchase") {
  switch (functionName) {
    case "getMyRecentOrders":
      return getMyRecentOrders();
    case "purchase":
      return purchase();
    default:
      throw new Error("Function not found");
  }
}
