export const keyToken = "wallet-t";
const keyUserLanguage = "lang";

export const getLocalStorageKey = () => window.localStorage.getItem(keyToken);

export const setLocalStorageKey = (value) =>
  window.localStorage.setItem(keyToken, value);

export const removeLocalStorageKey = () =>
  window.localStorage.removeItem(keyToken);

export const userLanguage = () => {
  return window.localStorage.getItem(keyUserLanguage);
};

export const setUserLanguage = (lang) =>
  window.localStorage.setItem(keyUserLanguage, lang);
