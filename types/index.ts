export type AIAgent = "openai" | "gemini";

export type FormState = {
  typeDefinition: string;
  count: number;
  agent: AIAgent;
};

export type AIAgentOptions = {
  label: string;
  value: AIAgent;
  icon: string;
};

export type AIAgentIconMap = {
  [key in AIAgent]: string;
};

export type ErrorDetail = {
  message?: string;
  type?: string;
  reason?: string;
  code?: string;
  "@type"?: string;
  metadata?: Record<string, string>;
  locale?: string;
};

export type ErrorResponse = {
  status?: number;
  statusText?: string;
  code?: string;
  type?: string;
  error?: ErrorDetail;
  errorDetails?: ErrorDetail[];
  headers?: Record<string, string>;
};
