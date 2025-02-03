import type { ErrorResponse, FormState } from "@/types";

export const useGenerate = () => {
  const state = reactive<FormState>({
    typeDefinition: "",
    count: 5,
    agent: "gemini",
  });

  const apiKeys = reactive({ openai: "", gemini: "" });

  const generatedData = ref("");
  const error = reactive({ title: "", desc: "" });
  const isGenerating = ref(false);
  const isErrorModalOpen = ref(false);
  const isSetKeysModalOpen = ref(false);

  const generateMockData = async () => {
    try {
      isGenerating.value = true;
      generatedData.value = "";
      const data = await $fetch<{ response?: string; error?: string }>(
        "/api/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: { ...state, apiKeys },
        }
      );

      if (data?.response) {
        generatedData.value = data.response;
      } else {
        const { title, description } = parseErrorResponse(
          data.error as ErrorResponse
        );
        error.title = title;
        error.desc = description;
        isErrorModalOpen.value = true;
      }
    } catch (error: unknown) {
      isErrorModalOpen.value = true;
      generatedData.value = "";
    } finally {
      isGenerating.value = false;
    }
  };

  const setApiKeys = (keys: { openai: string; gemini: string }) => {
    const { openai, gemini } = keys;
    apiKeys.gemini = gemini;
    apiKeys.openai = openai;

    isSetKeysModalOpen.value = false;
  };

  watch(
    () => isErrorModalOpen.value,
    (isOpen) => {
      if (!isOpen) {
        error.title = "";
        error.desc = "";
      }
    }
  );

  return {
    state,
    apiKeys,
    error,
    generatedData,
    isGenerating,
    isErrorModalOpen,
    isSetKeysModalOpen,
    generateMockData,
    setApiKeys,
  };
};
