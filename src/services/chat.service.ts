import dotenv from "dotenv";
import { Response } from "express";
import Openai from "openai";
import { FunctionToolCallArgumentsDeltaEvent } from "openai/lib/ChatCompletionStream";
import {
  ChatCompletionMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionTool,
} from "openai/resources";
import { ChatBody } from "../dto/chat.dto";
import { systemPrompt } from "../prompts/system";
import { getMyRecentOrdersDefinition } from "../tools/definition/get-recent-order.definition";
import { purchaseDefinition } from "../tools/definition/purchase.definition";
import { executor } from "../tools/executor";
import { getMessages, saveMessage } from "./supabase.service";
dotenv.config();

const openai = new Openai({ apiKey: process.env.OPENAI_API_KEY });

export class Chat {
  requestedToolCalls: FunctionToolCallArgumentsDeltaEvent[] = [];
  assistantContentTracker = "";

  messages: ChatCompletionMessageParam[] = [this.buildSystemPrompt()];
  body: ChatBody;

  constructor(body: ChatBody, chatHistory: ChatCompletionMessageParam[]) {
    this.messages = [...this.messages, ...chatHistory];
    this.messages.push({ role: "user", content: body.content });
    this.body = body;
  }

  async streamChatResponse(response: Response): Promise<Response> {
    const openaiStream = openai.beta.chat.completions.stream({
      model: "gpt-4o",
      messages: this.messages,
      stream: true,
      tools: this.tools,
    });

    openaiStream.on(
      "tool_calls.function.arguments.delta",
      (functionCallDelta) => {
        this.captureToolCallFromChunks(functionCallDelta);
        console.log("Function call delta:", functionCallDelta);
      }
    );

    openaiStream.on("chunk", (chunk) => {
      this.assistantContentTracker += chunk.choices[0].delta.content || "";
      response.write(`data: ${JSON.stringify(chunk)}\n\n`);
    });

    openaiStream.on("error", (error) => {
      console.error("OpenAI stream error:", error);
      response.end();
    });

    const final = await openaiStream.finalChatCompletion();
    const { finish_reason } = final.choices[0];

    if (finish_reason === "tool_calls") {
      for await (const toolCall of this.requestedToolCalls) {
        const result = executor(toolCall);
        const customToolCallId = `${toolCall.index}-custom-id`;
        this.messages.push({
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: customToolCallId,
              type: "function",
              function: {
                name: toolCall.name,
                arguments: toolCall.arguments,
              },
            },
          ],
        });

        this.messages.push({
          tool_call_id: customToolCallId,
          role: "tool",
          content: result || "Unable to find the result",
        });
      }
      return this.streamChatResponse(response);
    }

    await this.persistUserAndAssistantMessage();
    return response.end();
  }

  async persistUserAndAssistantMessage() {
    await saveMessage({
      user_id: this.body.userId,
      content: this.body.content,
      conversation_id: this.body.conversationId,
      timestamp: new Date().toISOString(),
      role: "user",
    });

    await saveMessage({
      conversation_id: this.body.conversationId,
      user_id: this.body.userId,
      content: this.assistantContentTracker,
      timestamp: new Date().toISOString(),
      role: "assistant",
    });
  }

  get tools(): ChatCompletionTool[] {
    return [purchaseDefinition, getMyRecentOrdersDefinition].map((fn) => ({
      function: fn,
      type: "function",
    }));
  }

  buildSystemPrompt(): ChatCompletionSystemMessageParam {
    return { role: "system", content: systemPrompt };
  }

  captureToolCallFromChunks(tool: FunctionToolCallArgumentsDeltaEvent) {
    if (!this.requestedToolCalls[tool.index]) {
      this.requestedToolCalls.push(tool);
      return;
    }

    const toolCall = this.requestedToolCalls[tool.index];
    toolCall.name = tool.name;
    toolCall.arguments = tool.arguments;
  }

  static async getChatHistory(userId: string, conversationId: string) {
    const messages = await getMessages(conversationId);

    return messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));
  }
}
