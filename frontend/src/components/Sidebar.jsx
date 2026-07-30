import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  FaRobot,
  FaHome,
  FaMicrophone,
  FaHistory,
  FaUpload,
  FaCog,
  FaGlobe,
} from "react-icons/fa";

function Sidebar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-300 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col justify-between shadow-2xl">

      {/* Top */}
      <div>

        {/* Logo */}
        <div className="p-6 border-b border-slate-700">

          <div className="flex items-center gap-3">

            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
              <FaRobot className="text-3xl text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Adeeb AI
              </h1>

              <p className="text-sm text-gray-400">
                Meeting Agent
              </p>
            </div>

          </div>

        </div>

        {/* Menu */}
        <nav className="mt-8 px-4 space-y-3">

          <NavLink to="/" className={menuClass}>
            <FaHome />
            <span>{t("dashboard")}</span>
          </NavLink>

          <NavLink to="/live-meeting" className={menuClass}>
            <FaMicrophone />
            <span>{t("liveMeeting")}</span>
          </NavLink>

          <NavLink to="/meetings" className={menuClass}>
            <FaHistory />
            <span>{t("meetings")}</span>
          </NavLink>

          <NavLink to="/upload" className={menuClass}>
            <FaUpload />
            <span>{t("uploadMeeting")}</span>
          </NavLink>

          <NavLink to="/settings" className={menuClass}>
            <FaCog />
            <span>{t("settings")}</span>
          </NavLink>

        </nav>
      </div>

      {/* Bottom */}
      <div className="p-5 border-t border-slate-700">

        <div className="flex items-center gap-2 mb-3 text-gray-300">
          <FaGlobe />
          <span className="font-semibold">
            {t("language")}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">

          <button
            onClick={() => changeLanguage("en")}
            className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition"
          >
            EN
          </button>

          <button
            onClick={() => changeLanguage("ur")}
            className="bg-green-600 hover:bg-green-700 py-2 rounded-lg transition"
          >
            اردو
          </button>

          <button
            onClick={() => changeLanguage("hi")}
            className="bg-orange-500 hover:bg-orange-600 py-2 rounded-lg transition"
          >
            हिन्दी
          </button>

        </div>

        <div className="mt-6 text-center">

          <p className="text-sm text-gray-400">
            Powered by
          </p>

          <h3 className="font-bold text-blue-400">
            Adeeb Technologies
          </h3>

          <p className="text-xs text-gray-500 mt-1">
            AI Meeting Assistant v1.0
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;