import { FunctionDefinition } from "openai/resources";

export const purchaseDefinition: FunctionDefinition = {
  name: "purchase",
  description: "Executes a purchase when the user wants to buy a product.",
  parameters: {
    type: "object",
    required: ["id", "name"],
    properties: {
      id: {
        type: "string",
        description: "The unique identifier of the product.",
      },
      name: {
        type: "string",
        description: "The name of the product.",
      },
      info: {
        type: "string",
        description: "Additional details or description of the product.",
      },
      image: {
        type: "string",
        description: "The URL of the product image.",
      },
    },
  },
};
