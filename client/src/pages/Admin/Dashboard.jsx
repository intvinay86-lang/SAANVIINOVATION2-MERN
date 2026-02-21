import { FiBriefcase, FiImage, FiUsers, FiMail } from "react-icons/fi";
import StatsCard from "./Components/StatsCard";
import RecentMessages from "./Components/RecentMessages";
import QuickActions from "./Components/QuickActions";

function Dashboard() {
  const stats = [
    {
      title: "Total Services",
      value: "6",
      icon: <FiBriefcase />,
      color: "orange",
    },
    {
      title: "Portfolio Items",
      value: "12",
      icon: <FiImage />,
      color: "blue",
    },
    {
      title: "Total Clients",
      value: "8",
      icon: <FiUsers />,
      color: "green",
    },
    {
      title: "Total Messages",
      value: "24",
      icon: <FiMail />,
      color: "purple",
    },
  ];

  return (
    <>
      <title>Admin Dashboard - SAANVI INNOVATION</title>
      <meta name="robots" content="noindex, nofollow" />

      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Messages Table */}
        <RecentMessages />
      </div>
    </>
  );
}

export default Dashboard;
