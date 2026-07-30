import { useTranslation } from "react-i18next";
import { FaRobot } from "react-icons/fa";
import { FiUpload, FiUser } from "react-icons/fi";

function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="w-full">
      <div className="flex items-center justify-between">

        {/* Left Side */}
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
            <FaRobot className="text-white text-2xl" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Adeeb Meeting Agent
            </h1>

            <p className="text-sm text-gray-500">
              {t("dashboard")}
            </p>
          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition duration-300 shadow-md">

            <FiUpload size={18} />

            {t("uploadMeeting")}

          </button>

          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">

            <FiUser className="text-xl text-blue-600" />

            <div>
              <p className="text-sm font-semibold text-gray-700">
                Admin
              </p>

              <p className="text-xs text-gray-500">
                Adeeb Technologies
              </p>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;