import { IsString, IsUUID } from "class-validator";

export class ChatBody {
  @IsString()
  content: string;

  @IsUUID()
  userId: string;

  @IsString()
  conversationId: string;
}
