import { GeminiService, OpenAIService } from "../services";
import { Payload, MockDataResponse } from "../types";

export default defineEventHandler(async (event): Promise<MockDataResponse> => {
  const payload = await readBody<Payload>(event);

  const { typeDefinition, count, agent } = payload;

  let response: string = "";
  let error: any;

  try {
    if (agent === "gemini") {
      const geminiService = new GeminiService(payload.apiKeys.gemini);
      response = await geminiService.generateMockData(typeDefinition, count);
    } else {
      const openAIService = new OpenAIService(payload.apiKeys.openai);
      response = await openAIService.generateMockData(typeDefinition, count);
    }
  } catch (err) {
    error = err;
  }

  return { response, error };
});
