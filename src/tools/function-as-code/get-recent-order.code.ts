import { restaurants } from "../../mocks/restorants";

export const getMyRecentOrders = () => {
    return JSON.stringify(restaurants.splice(0, 3));
};
