import { GeminiService, OpenAIService } from "../services";
import { Payload, MockDataResponse } from "../types";

export default defineEventHandler(async (event): Promise<MockDataResponse> => {
  const payload = await readBody<Payload>(event);

  const { typeDefinition, numItems, agent } = payload;

  let response: string = "";
  let error: any;

  try {
    if (agent === "gemini") {
      const geminiService = new GeminiService(
        process.env.GEMINI_API_KEY as string
      );
      response = await geminiService.generateMockData(typeDefinition, numItems);
    } else {
      const openAIService = new OpenAIService(
        process.env.OPENAI_API_KEY as string
      );
      response = await openAIService.generateMockData(typeDefinition, numItems);
    }
  } catch (err) {
    error = err;
  }

  return { response, error };
});
