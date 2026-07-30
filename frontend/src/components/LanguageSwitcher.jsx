import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage("en")}
        className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        🇺🇸 EN
      </button>

      <button
        onClick={() => changeLanguage("ur")}
        className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
      >
        🇵🇰 اردو
      </button>

      <button
        onClick={() => changeLanguage("hi")}
        className="px-3 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
      >
        🇮🇳 हिन्दी
      </button>
    </div>
  );
}

export default LanguageSwitcher;