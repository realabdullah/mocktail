export const showToast = (
  title: string,
  type: "success" | "error" = "success"
) => {
  const toast = useToast();
  toast.add({
    title,
    color: type === "success" ? "green" : "red",
  });
};
