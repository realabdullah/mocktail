export type Payload = {
  typeDefinition: string;
  count: number;
  agent: "openai" | "gemini";
  apiKeys: {
    openai: string;
    gemini: string;
  };
};

export type MockDataResponse = {
  response: string;
  error?: any;
};
