import { FunctionDefinition } from "openai/resources";

export const getOrdersDefinition: FunctionDefinition = {
  name: "getOrders",
  description: "Retrieves the user's recent orders within a specified date range.",
  parameters: {
    type: "object",
    required: ["from", "until"],
    properties: {
      from: {
        type: "string",
        description: "The start date for filtering recent orders (ISO 8601 format).",
      },
      until: {
        type: "string",
        description: "The end date for filtering recent orders (ISO 8601 format).",
      },
    },
  },
};
