import { NavLink } from "react-router-dom";

function AdminMenuItem({ item, closeSidebar }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end={item.end}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
          isActive
            ? "bg-orange-500 text-white"
            : "text-gray-300 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <Icon className="text-xl" />
      <span className="font-medium">{item.name}</span>
    </NavLink>
  );
}

export default AdminMenuItem;
