export const handleError = (setError, fieldMessages) => {
  setError((prev) => ({
    ...prev,
    ...fieldMessages,
  }));
};
