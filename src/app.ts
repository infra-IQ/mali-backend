import express from "express";
import {
    RoutingControllersOptions,
    useExpressServer,
} from "routing-controllers";

const app = express();
const options: RoutingControllersOptions = {
  middlewares: [],
  controllers: [],
  cors: true,
};

useExpressServer(app, options);

export default app;
