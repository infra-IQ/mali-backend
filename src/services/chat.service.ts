import dotenv from "dotenv";
import { Response } from "express";
import Openai from "openai";
import {
  ChatCompletionSystemMessageParam,
  ChatCompletionTool,
} from "openai/resources";
import { ChatBody } from "../dto/chat.dto";
import { systemPrompt } from "../prompts/system";
import { getMyRecentOrdersDefinition } from "../tools/definition/get-recent-order.definition";
import { purchaseDefinition } from "../tools/definition/purchase.definition";
dotenv.config();

const openai = new Openai({ apiKey: process.env.OPENAI_API_KEY });

export class Chat {

  static async streamChatResponse(
    response: Response,
    body: ChatBody
  ): Promise<void> {
    const openaiStream = openai.beta.chat.completions.stream({
      model: "gpt-4",
      messages: [
        this.buildSystemPrompt(),
        { role: "user", content: body.content },
      ],
      stream: true,
      tools: Chat.tools,
    });

    openaiStream.on("chunk", (chunk) => {
      response.write(`data: ${JSON.stringify(chunk)}\n\n`);
    });



    const final = await openaiStream.finalChatCompletion();
    const { finish_reason } = final.choices[0];

    if(finish_reason === "tool_calls") {
      
    }

    openaiStream.on("end", () => {
      console.log("OpenAI stream ended");
      response.write(`data: [DONE]\n\n`);
      response.end();
    });


    openaiStream.on("error", (error) => {
      console.error("OpenAI stream error:", error);
      response.end();
    });
  }

  static get tools(): ChatCompletionTool[] {
    return [purchaseDefinition, getMyRecentOrdersDefinition].map((fn) => ({
      function: fn,
      type: "function",
    }));
  }

  static buildSystemPrompt(): ChatCompletionSystemMessageParam {
    return { role: "system", content: systemPrompt };
  }
}
