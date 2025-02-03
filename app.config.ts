export default defineAppConfig({
  ui: {
    textarea: {
      base: "disabled:cursor-text",
      color: {
        white: {
          outline: "focus:ring-slate-500 dark:focus:ring-slate-400",
        },
      },
    },
    select: {
      color: {
        white: {
          outline: "focus:ring-slate-500 dark:focus:ring-slate-400",
        },
      },
    },
    input: {
      color: {
        white: {
          outline: "focus:ring-slate-500 dark:focus:ring-slate-400",
        },
      },
    },
    formGroup: {
      error: "whitespace-nowrap",
    },
  },
});
