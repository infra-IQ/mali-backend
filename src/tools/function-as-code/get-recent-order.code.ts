import { restaurants } from "../../mocks/restaurants";

export const getMyRecentOrders = () => {
  return JSON.stringify(restaurants.splice(0, 3));
};
