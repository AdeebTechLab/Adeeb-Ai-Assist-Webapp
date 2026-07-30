import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LanguageSwitcher from "../components/LanguageSwitcher";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="bg-white shadow-sm border-b">

          <div className="flex items-center justify-between px-6 py-3">

            <Navbar />

            <LanguageSwitcher />

          </div>

        </div>

        {/* Page Content */}
        <main className="p-6 overflow-auto flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}

export default Layout;