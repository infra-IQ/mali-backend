import { randomUUID } from "crypto";
import { Body, JsonController, Post } from "routing-controllers";
import { createConversation, createUser } from "../services/supabase.service";

@JsonController("/api/conversations")
export class ConversationController {
  @Post("")
  async create(@Body() chatBody: { userId: string }) {
    const uiid = randomUUID();

    const createNewIfNotExistUser = await createUser(chatBody.userId);

    const newConversation = await createConversation(uiid, chatBody.userId);
    return { conversation: newConversation, user: createNewIfNotExistUser };
  }
}
