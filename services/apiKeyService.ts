export const getApiKey = (): string | null => {
  try {
    return localStorage.getItem('gemini-api-key');
  } catch (e) {
    console.error("Failed to read API key from localStorage", e);
    return null;
  }
};

export const setApiKey = (key: string): void => {
  try {
    localStorage.setItem('gemini-api-key', key);
  } catch (e) {
    console.error("Failed to save API key to localStorage", e);
  }
};
