import { createPrompt, generateSchema } from "../utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  private client: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async generateMockData(
    typeDefinition: string,
    count: number
  ): Promise<string> {
    try {
      const schema = generateSchema(typeDefinition, count);

      const model = this.client.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: createPrompt(typeDefinition, count),
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });

      const completion = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: typeDefinition }] }],
        generationConfig: { maxOutputTokens: 20000, temperature: 0.1 },
      });

      return completion.response.text();
    } catch (err) {
      throw err;
    }
  }
}
