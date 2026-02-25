import { FiUser } from "react-icons/fi";
import { MENU_ITEMS } from "../../pages/Admin/Admin";

function AdminSidebar({ user, isSidebarOpen, closeSidebar }) {
  const activeSection = window.location.hash.slice(1) || "dashboard";

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 bg-slate-900 text-white w-64 transform transition-transform duration-300 ease-in-out z-40 flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* User Profile (Mobile) - Fixed at top */}
        <div className="lg:hidden px-6 pt-6 pb-4 border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FiUser size={20} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6">
          <nav className="space-y-2">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={closeSidebar}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-lg"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span className="font-medium truncate">{item.name}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Footer - Fixed at bottom (optional) */}
        <div className="px-6 py-4 border-t border-slate-700 flex-shrink-0">
          <p className="text-xs text-gray-400 text-center">Admin Panel v1.0</p>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
