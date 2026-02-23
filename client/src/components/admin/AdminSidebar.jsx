import { FiUser } from "react-icons/fi";
import AdminMenuItem from "./AdminMenuItem";

function AdminSidebar({ user, isSidebarOpen, closeSidebar, menuItems }) {
  return (
    <aside
      className={`fixed left-0 top-16 h-full bg-slate-900 text-white w-64 transform transition-transform duration-300 ease-in-out z-40 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="p-6">
        {/* User Profile (Mobile) */}
        <div className="lg:hidden mb-6 pb-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <FiUser size={20} />
            </div>
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-gray-400">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <AdminMenuItem
              key={item.path}
              item={item}
              closeSidebar={closeSidebar}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default AdminSidebar;
