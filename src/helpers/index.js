export const limitString = (str) => {
  return str.length > 370
    ? { str: str.slice(0, 367).concat("..."), addButton: true }
    : { str: str, addButton: false };
};
