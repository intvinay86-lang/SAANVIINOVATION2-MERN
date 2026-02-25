import { useState, useEffect, lazy, Suspense } from "react";
import {
  FiHome,
  FiUser,
  FiLayout,
  FiInfo,
  FiMail,
  FiFileText,
  FiShield,
  FiDollarSign,
} from "react-icons/fi";
import Loading from "../../components/Loading";

// Lazy load admin components
const Dashboard = lazy(() => import("./Dashboard"));
const SiteInfo = lazy(() => import("./SiteInfo"));
const ContactSettings = lazy(() => import("./ContactSettings"));
const FooterSettings = lazy(() => import("./FooterSettings"));
const PricingSettings = lazy(() => import("./PricingSettings"));
const TermsSettings = lazy(() => import("./TermsSettings"));
const PrivacySettings = lazy(() => import("./PrivacySettings"));
const Profile = lazy(() => import("./Profile"));

// Menu items with component mapping
const MENU_ITEMS = [
  { id: "dashboard", name: "Dashboard", icon: FiHome, component: Dashboard },
  { id: "siteinfo", name: "Site Info", icon: FiInfo, component: SiteInfo },
  {
    id: "contact",
    name: "Contact Settings",
    icon: FiMail,
    component: ContactSettings,
  },
  {
    id: "footer",
    name: "Footer Settings",
    icon: FiLayout,
    component: FooterSettings,
  },
  {
    id: "pricing",
    name: "Pricing Settings",
    icon: FiDollarSign,
    component: PricingSettings,
  },
  {
    id: "terms",
    name: "Terms Settings",
    icon: FiFileText,
    component: TermsSettings,
  },
  {
    id: "privacy",
    name: "Privacy Settings",
    icon: FiShield,
    component: PrivacySettings,
  },
  { id: "profile", name: "Profile", icon: FiUser, component: Profile },
];

function Admin() {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "dashboard";
      setActiveSection(hash);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Get active component
  const activeMenuItem =
    MENU_ITEMS.find((item) => item.id === activeSection) || MENU_ITEMS[0];
  const ActiveComponent = activeMenuItem.component;

  return (
    <div className="flex flex-col h-full">
      {/* Mobile Tab Navigation */}
      <div className="lg:hidden mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-max pb-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  activeSection === item.id
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.name}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        <Suspense fallback={<Loading />}>
          <ActiveComponent />
        </Suspense>
      </div>
    </div>
  );
}

export { MENU_ITEMS };
export default Admin;
