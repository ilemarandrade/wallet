import en from "./en.json";
import es from "./es.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const keyUserLanguage = "lang";
export const userLanguage = () => window.localStorage.getItem(keyUserLanguage);
export const setUserLanguage = (lang) =>
  window.localStorage.setItem(keyUserLanguage, lang);

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
    fallbackLng: userLanguage() || "en",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
