export const toKeyword = (word: string) => {
  const clean = word
    .replace(/[^a-zA-Z0-9- ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!clean) return [];

  return [...new Set([clean, clean.replace(/--/g, "")])];
};
