import { type Response } from "express";
import {
  BadRequestError,
  Body,
  HttpCode,
  JsonController,
  Post,
  Res,
} from "routing-controllers";
import { ChatBody } from "../dto/chat.dto";
import { Chat } from "../services/chat.service";
import {
  checkConversationExist,
  checkIdUserExist,
} from "../services/supabase.service";

@JsonController("/api/chat")
export class ChatController {
  @Post("")
  @HttpCode(201)
  async chat(
    @Res() response: Response,
    @Body({ validate: true, required: true }) body: ChatBody
  ) {
    response.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    const conversationExist = await checkConversationExist(body.conversationId);
    const userExist = await checkIdUserExist(body.userId);
    if (!conversationExist || !userExist) {
      throw new BadRequestError("Conversation or User not found");
    }

    const chatHistory = await Chat.getChatHistory(
      body.userId,
      body.conversationId
    );

    const newChat = new Chat(body, chatHistory);
    return await newChat.streamChatResponse(response);
  }
}
