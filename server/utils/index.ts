import OpenAI from "openai";
import { SchemaType } from "@google/generative-ai";

export const createPrompt = (typeDefinition: string, count: number): string => {
  return `You are a **REALISTIC MOCK DATA GENERATOR**.  
  **STRICTLY FOLLOW THESE INSTRUCTIONS:**  
  - **IGNORE EVERYTHING EXCEPT THE TYPE DEFINITION.**  
  - **OUTPUT ONLY JSON—NO EXTRA TEXT, NO CODE BLOCKS.**  
  - **Generate EXACTLY ${count} items IF THE TYPE IS AN ARRAY** (DO NOT GENERATE AN ARRAY IF IT'S AN OBJECT).  
  - Ensure all generated data is **valid** and **matches the TypeScript definition.**  
  - **Assign a reasonable and appropriate title to the generated data.**  
  - **Generate a hex color code that best suits the nature of the generated data.**  
  - **Analyze the type definition and generated data to suggest a MAXIMUM of 3 relevant tags, formatted as lowercase strings.**  
  - **Return the response in the EXACT format below:**  
  
  \`\`\`json
  {
    "title": "<string>",
    "data": <mock_data>, 
    "color": "<hex_color_code>",
    "tags": ["<tag1>", "<tag2>", "<tag3>"] // STRICTLY max 3 tags
  }
  \`\`\`
  
  - **Follow this JSON Schema strictly:** (DO NOT DEVIATE)
  
  \`\`\`json
  ${JSON.stringify(generateSchema(typeDefinition, count), null, 2)}
  \`\`\`
  
  **Type Definition:**  
  ${typeDefinition}`;
};

export const createOpenAIMessage = (
  typeDefinition: string,
  count: number
): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    { role: "developer", content: createPrompt(typeDefinition, count) },
    { role: "user", content: typeDefinition },
  ];
};

const extractFieldsFromType = (
  typeDefinition: string
): Record<string, string> => {
  const fieldRegex = /^\s*(\w+):\s*([^;]+)/gm;
  const fields: Record<string, string> = {};
  let match;
  while ((match = fieldRegex.exec(typeDefinition))) {
    const [, key, valueType] = match;
    fields[key] = valueType.trim();
  }
  return fields;
};

const mapTypeToSchemaType = (tsType: string) => {
  const normalizedType = tsType.trim();

  if (normalizedType === "string") return { type: SchemaType.STRING };
  if (normalizedType === "number") return { type: SchemaType.NUMBER };
  if (normalizedType === "boolean") return { type: SchemaType.BOOLEAN };
  if (normalizedType === "string[]" || normalizedType === "Array<string>") {
    return { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } };
  }
  if (normalizedType === "Date") {
    return { type: SchemaType.STRING, format: "date-time" };
  }
  if (normalizedType === "string | Date") {
    return {
      oneOf: [
        { type: SchemaType.STRING, format: "date-time" },
        { type: SchemaType.STRING },
      ],
    };
  }
  return { type: SchemaType.STRING };
};

export const generateSchema = (typeDefinition: string, count: number) => {
  const isArray = /\[\]\s*$/.test(typeDefinition.trim());
  const fieldTypes = extractFieldsFromType(typeDefinition);

  const propertiesData = Object.entries(fieldTypes).reduce(
    (acc, [key, type]) => {
      acc[key] = mapTypeToSchemaType(type);
      return acc;
    },
    {} as Record<string, any>
  );

  const dataSchema = isArray
    ? {
        type: SchemaType.ARRAY,
        minItems: count,
        maxItems: count,
        items: {
          type: SchemaType.OBJECT,
          properties: propertiesData,
          required: Object.keys(propertiesData),
        },
      }
    : {
        type: SchemaType.OBJECT,
        properties: propertiesData,
        required: Object.keys(propertiesData),
      };

  return {
    description: "Generated mock data based on the TypeScript type definition.",
    type: SchemaType.OBJECT,
    properties: {
      title: {
        type: SchemaType.STRING,
        description:
          "A reasonable and appropriate title for the generated data",
      },
      data: dataSchema,
      color: {
        type: SchemaType.STRING,
        description: "A hex code color that really suits the generated data",
      },
      tags: {
        type: SchemaType.ARRAY,
        items: { type: SchemaType.STRING },
        minItems: 1,
        maxItems: 3, // STRICTLY enforce a maximum of 3 tags
        description:
          "Up to 3 tags suggested based on the generated data, in lowercase",
      },
    },
    required: ["title", "data", "color", "tags"],
  };
};
