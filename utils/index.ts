import type {
  AIAgentIconMap,
  AIAgentOptions,
  ErrorDetail,
  ErrorResponse,
} from "@/types";

export const AI_AGENTS: AIAgentOptions[] = [
  { label: "OpenAI", value: "openai", icon: "i-simple-icons-openai" },
  { label: "Gemini", value: "gemini", icon: "i-simple-icons-googlegemini" },
];

export const ICONS_MAP: AIAgentIconMap = {
  openai: "i-simple-icons-openai",
  gemini: "i-simple-icons-googlegemini",
};

export const formatString = (errorCode: string): string => {
  const specialCases: { [key: string]: string } = {
    id: "ID",
    ui: "UI",
    ip: "IP",
    url: "URL",
  };

  const words = errorCode
    .replace(/^[*]+/, "")
    .split("_")
    .map((word) => {
      if (specialCases[word]) return specialCases[word];

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

  return words.join(" ");
};

export const parseErrorResponse = (error: ErrorResponse) => {
  const errorDetails: ErrorDetail[] = [
    error.error || {},
    ...(error.errorDetails || []),
  ];

  const generateTitle = (input?: string) => {
    if (!input) return;
    return formatString(input);
  };

  const title =
    generateTitle(error.type) ||
    generateTitle(error.code) ||
    generateTitle(error.error?.type) ||
    generateTitle(error.error?.code) ||
    error.statusText ||
    "Unknown Error";

  const description =
    errorDetails.find((detail) => detail.message)?.message ||
    errorDetails.find((detail) => detail["@type"]?.includes("LocalizedMessage"))
      ?.message ||
    `Error occurred with status ${error.status || "unknown"}`;

  return {
    title,
    description,
  };
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};
