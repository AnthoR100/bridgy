import { useState } from "react";
import Logo from "../assets/Logo.png";
import BarreLaterale from "./BarreLaterale.jsx";

/**
 * Layout responsive qui conserve le design desktop tout en offrant
 * un menu hamburger sur mobile.
 */
const LayoutDashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((open) => !open);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay mobile */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 transform bg-white shadow-lg transition-transform duration-300 lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <BarreLaterale onNavigate={closeSidebar} />
      </div>

      {/* Contenu principal */}
      <div className="flex flex-1 flex-col">
        {/* Topbar mobile */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-gray-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={toggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm active:scale-[0.98]"
          >
            <span className="sr-only">Ouvrir le menu</span>
            <svg
              className="h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <img src={Logo} alt="Bridgy" className="h-8 w-8 object-contain" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Bridgy</p>
              <p className="text-xs text-gray-500">Espace connecté</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};

export default LayoutDashboard;

