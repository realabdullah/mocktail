import type { ErrorResponse, FormState } from "@/types";

export const useGenerate = () => {
  const state = reactive<FormState>({
    typeDefinition: "",
    count: 5,
    agent: "gemini",
  });

  const generatedData = ref("");
  const error = reactive({ title: "", desc: "" });
  const isGenerating = ref(false);
  const isErrorModalOpen = ref(false);
  const generateMockData = async () => {
    try {
      isGenerating.value = true;
      generatedData.value = "";
      const data = await $fetch<{ response?: string; error?: string }>(
        "/api/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: { ...state },
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
    error,
    generatedData,
    isGenerating,
    isErrorModalOpen,
    generateMockData,
  };
};
