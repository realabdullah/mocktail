export type Payload = {
  typeDefinition: string;
  numItems: number;
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
