import { restaurants } from "../mocks/restaurants";

export const systemPrompt = ` 
Here are the products, and the restorants where the user could get everthing they would like to eat.
products: ${JSON.stringify(restaurants)}`;
