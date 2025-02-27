import express from "express";
import "reflect-metadata";
import {
  RoutingControllersOptions,
  useExpressServer,
} from "routing-controllers";
import { ChatController } from "./controllers/chat.controller";
import { ConversationController } from "./controllers/conversation.service";

const app = express();
const options: RoutingControllersOptions = {
  middlewares: [],
  controllers: [ChatController, ConversationController],
  cors: true,
};

useExpressServer(app, options);

export default app;
