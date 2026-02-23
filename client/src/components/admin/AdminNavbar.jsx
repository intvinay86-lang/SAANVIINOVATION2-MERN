import { Link } from "react-router-dom";
import { FiMenu, FiX, FiLogOut, FiUser, FiExternalLink } from "react-icons/fi";

function AdminNavbar({ user, isSidebarOpen, toggleSidebar, handleLogout }) {
  return (
    <nav className="bg-slate-900 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Menu Button + Brand */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-white hover:text-orange-500 transition-colors duration-300"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <h1 className="text-xl font-bold">
              <span className="text-orange-500">SAANVI</span> INNOVATION
            </h1>
          </div>

          {/* Right: User Profile + Actions */}
          <div className="flex items-center space-x-4">
            {/* Site View Button */}
            <Link
              to="/"
              target="_blank"
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors duration-300"
              aria-label="View site"
            >
              <FiExternalLink size={16} />
              <span className="hidden sm:inline">Site View</span>
            </Link>

            {/* User Profile (Desktop) */}
            <div className="hidden md:flex items-center space-x-3 bg-slate-800 px-4 py-2 rounded-lg">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <FiUser size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-400">{user.role}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors duration-300"
              aria-label="Logout"
            >
              <FiLogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
