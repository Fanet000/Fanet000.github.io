// utils/translate.ts
const translations = { en: { hello: "Hello" }, es: { hello: "Hola" } };
export function t(key: string, lang: string = "en") {
  return translations[lang][key] || key;
}