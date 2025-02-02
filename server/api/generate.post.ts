import OpenAI from "openai";
import {
  GoogleGenerativeAI,
  ResponseSchema,
  SchemaType,
} from "@google/generative-ai";

export default defineEventHandler(async (event) => {
  const payload = (await readBody(event)) as {
    typeDefinition: string;
    numItems?: number;
    agent: "openai" | "gemini";
  };
  console.log("Received payload: ", payload);

  const DEFAULT_CONFIG = {
    model: "gpt-4o-mini" as OpenAI.Chat.ChatModel,
    numItems: 5,
  };

  const createPrompt = (typeDefinition: string, numItems: number) => {
    return `You are a mock data generator. Generate realistic mock data based on this TypeScript type definition. 
     The data should be valid according to the type and include ${numItems} items if it's an array type.
     Type definition: ${typeDefinition}`;
  };

  const createMessage = (typeDefinition: string, numItems: number) => {
    return [
      { role: "developer", content: createPrompt(typeDefinition, numItems) },
      { role: "user", content: typeDefinition },
    ] as OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  };

  let response;
  let error;

  const generateWithOpenAI = async (
    typeDefinition: string,
    numItems: number
  ) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const openAIClient = new OpenAI({ apiKey });

    try {
      const completion = await openAIClient.chat.completions.create({
        model: DEFAULT_CONFIG.model,
        messages: createMessage(
          payload.typeDefinition,
          payload.numItems ?? DEFAULT_CONFIG.numItems
        ),
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
      console.log("Generated mock data:", completion);
      response = completion.choices[0].message.content;
    } catch (err) {
      error = err;
    }
  };

  const generateWithGemini = async (
    typeDefinition: string,
    numItems: number
  ) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY as string;
      const geminiClient = new GoogleGenerativeAI(apiKey);

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

      const model = geminiClient.getGenerativeModel({
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

      console.log("completion: ", completion.response.text());
      response = completion.response.text();
    } catch (err) {
      error = err;
    }
  };

  if (payload.agent === "gemini") {
    await generateWithGemini(
      payload.typeDefinition,
      payload.numItems ?? DEFAULT_CONFIG.numItems
    );
  } else {
    await generateWithOpenAI(
      payload.typeDefinition,
      payload.numItems ?? DEFAULT_CONFIG.numItems
    );
  }

  return {
    response,
    error,
  };
});
