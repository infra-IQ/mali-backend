import { type Response } from "express";
import { Body, HttpCode, JsonController, Post, Res } from "routing-controllers";
import { ChatBody } from "../dto/chat.dto";
import { Chat } from "../services/chat.service";

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

    const newChat = new Chat(body);
    return await newChat.streamChatResponse(response);
    
  }
}
