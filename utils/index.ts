import type {
  AIAgentIconMap,
  AIAgentOptions,
  ErrorDetail,
  ErrorResponse,
  JsonValueType,
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

export const refineResponse = (response: unknown) => {
  const responseStr =
    typeof response === "string" ? response : JSON.stringify(response);

  const cleaned = responseStr
    .replace(/^```json\s*/, "")
    .replace(/```$/, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    return null;
  }
};

export const getType = (value: any) => {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value as JsonValueType;
};

export const getTypeColor = (type: JsonValueType) => {
  switch (type) {
    case "string":
      return "text-green-600 dark:text-green-400";
    case "number":
      return "text-blue-600 dark:text-blue-400";
    case "boolean":
      return "text-purple-600 dark:text-purple-400";
    case "null":
      return "text-gray-500 dark:text-gray-400";
    case "object":
      return "text-orange-600 dark:text-orange-400";
    case "array":
      return "text-yellow-600 dark:text-yellow-400";
    default:
      return "";
  }
};

export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}
