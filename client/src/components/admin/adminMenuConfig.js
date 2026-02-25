import {
  FiHome,
  FiUser,
  FiLayout,
  FiInfo,
  FiMail,
  FiFileText,
  FiShield,
} from "react-icons/fi";

// Admin menu configuration
export const ADMIN_MENU_ITEMS = [
  { name: "Dashboard", path: "/admin", icon: FiHome, end: true },
  { name: "Site Info", path: "/admin/siteinfo", icon: FiInfo },
  { name: "Contact Settings", path: "/admin/contact", icon: FiMail },
  { name: "Footer Settings", path: "/admin/footer", icon: FiLayout },
  { name: "Terms Settings", path: "/admin/terms", icon: FiFileText },
  { name: "Privacy Settings", path: "/admin/privacy", icon: FiShield },
  { name: "Profile", path: "/admin/profile", icon: FiUser },
];
