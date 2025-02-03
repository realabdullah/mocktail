export type Payload = {
  typeDefinition: string;
  numItems: number;
  agent: "openai" | "gemini";
};

export type MockDataResponse = {
  response: string;
  error?: any;
};
