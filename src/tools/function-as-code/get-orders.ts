import { restaurants } from "../../mocks/restaurants";

export const getOrders = () => {
  return JSON.stringify(restaurants.splice(0, 3));
};
