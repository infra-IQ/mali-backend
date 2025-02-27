import { FunctionDefinition } from "openai/resources";

export const purchaseDefinition: FunctionDefinition = {
  name: "purchase",
  description: "Executes a purchase when the user wants to buy a product.",
  parameters: {
    type: "object",
    required: ["name", "quantity", "image", "amount"],
    properties: {
      name: {
        type: "string",
        description: "The name of the product.",
      },
      quantity: {
        type: "string",
        description: "The quantity of the product to purchase.",
      },
      image: {
        type: "string",
        description: "The URL of the product image.",
      },
      amount: {
        type: "number",
        description: "The total amount of the purchase.",
      }
    },
  },
};
