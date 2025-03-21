import { createOpenAIMessage, generateSchema } from "../utils";
import OpenAI from "openai";

export class OpenAIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generateMockData(
    typeDefinition: string,
    count: number
  ): Promise<string> {
    try {
      const schema = generateSchema(typeDefinition, count);
      const completion = await this.client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: createOpenAIMessage(typeDefinition, count),
        response_format: schema as any,
      });

      return completion.choices[0].message.content as string;
    } catch (err) {
      throw err;
    }
  }
}
