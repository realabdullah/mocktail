import { createOpenAIMessage } from "../utils";
import OpenAI from "openai";

export class OpenAIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generateMockData(
    typeDefinition: string,
    numItems: number
  ): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: createOpenAIMessage(typeDefinition, numItems),
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "typescript_schema",
            schema: {
              type: "object",
              properties: {
                mockData: {
                  description:
                    "Generated mock data based on the TypeScript type",
                  type: "string",
                },
              },
              required: ["mockData"],
            },
          },
        },
      });

      return completion.choices[0].message.content as string;
    } catch (err) {
      throw err;
    }
  }
}
