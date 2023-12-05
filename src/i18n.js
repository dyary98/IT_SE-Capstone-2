import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./../public/locales/En/translationsEn.json";
import translationAR from "./../public/locales/Ar/translationsAr.json";
import translationKU from "./../public/locales/Ku/translationsKu.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
  ku: {
    translation: translationKU,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // default language
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    rtl: ['ar'] // Define which languages are RTL
  });

export default i18n;
