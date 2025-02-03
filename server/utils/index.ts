import OpenAI from "openai";

export const createPrompt = (
  typeDefinition: string,
  numItems: number
): string => {
  return `You are a mock data generator. Generate realistic mock data based on this TypeScript type definition. 
          The data should be valid according to the type and include ${numItems} items if it's an array type.
          Type definition: ${typeDefinition}`;
};

export const createOpenAIMessage = (
  typeDefinition: string,
  numItems: number
): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    { role: "developer", content: createPrompt(typeDefinition, numItems) },
    { role: "user", content: typeDefinition },
  ];
};
