export const dec2hex = (dec) => {
  return dec.toString(16).padStart(2, "0");
};
export const generateId = (len?: number) => {
  var arr = new Uint8Array((len || 20) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
};
