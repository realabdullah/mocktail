import { createPrompt } from "../utils";
import {
  GoogleGenerativeAI,
  ResponseSchema,
  SchemaType,
} from "@google/generative-ai";

export class GeminiService {
  private client: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async generateMockData(
    typeDefinition: string,
    numItems: number
  ): Promise<string> {
    try {
      const schema = {
        description: "Generated mock data based on the TypeScript type",
        type: SchemaType.ARRAY || SchemaType.OBJECT,
        items: {
          type: SchemaType.STRING || SchemaType.OBJECT,
          properties: {
            mockData: {
              description: "Generated mock data based on the TypeScript type",
              type: "string",
            },
          },
          required: ["mockData"],
        },
      };

      const model = this.client.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: createPrompt(typeDefinition, numItems),
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: schema as ResponseSchema,
        },
      });

      const completion = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: typeDefinition }] }],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.1,
        },
      });

      return completion.response.text();
    } catch (err) {
      throw err;
    }
  }
}
