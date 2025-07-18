const translations: Record<string, Record<string, string>> = {
  en: { hello: "Hello" },
  es: { hello: "Hola" },
};

export function t(key: string, lang: string = "en") {
  return translations[lang]?.[key] || key;
}
