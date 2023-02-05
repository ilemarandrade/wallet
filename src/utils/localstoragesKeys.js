export const keyToken = "wallet-t";

export const getLocalStorageKey = () => window.localStorage.getItem(keyToken);

export const setLocalStorageKey = (value) =>
  window.localStorage.setItem(keyToken, value);

export const removeLocalStorageKey = () =>
  window.localStorage.removeItem(keyToken);
