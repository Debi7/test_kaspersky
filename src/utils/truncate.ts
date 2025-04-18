export const truncateText = (text: string, length: number = 100): string => {
  if (text.length <= length) {
    return text;
  }
  return `${text.substring(0, length)}...`;
};
