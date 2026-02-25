import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiBriefcase,
  FiImage,
  FiUsers,
  FiMail,
  FiRefreshCw,
} from "react-icons/fi";
import IconCard from "../../components/cards/IconCard";
import { getMainSiteData } from "../../features/siteData/siteDataSlice";
import { selectSiteData } from "../../features/siteData/siteDataSelectors";
import { getContactStats } from "../../features/contact/contactSlice";
import { selectContactStats } from "../../features/contact/contactSelectors";
import RecentMessages from "./Components/RecentMessages";

function Dashboard() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const contactStats = useSelector(selectContactStats);

  useEffect(() => {
    if (!siteData) {
      dispatch(getMainSiteData());
    }
    dispatch(getContactStats());
  }, [dispatch, siteData]);

  const handleRefresh = () => {
    dispatch(getMainSiteData());
    dispatch(getContactStats());
  };

  // Get counts from Redux store
  const servicesCount = siteData?.services?.length || 0;
  const portfolioCount = siteData?.portfolioProjects?.length || 0;
  const clientsCount = siteData?.clients?.length || 0;
  const unreadMessages = contactStats?.unread || 0;

  const stats = [
    {
      title: "Total Services",
      value: servicesCount.toString(),
      icon: <FiBriefcase />,
      color: "orange",
    },
    {
      title: "Portfolio Items",
      value: portfolioCount.toString(),
      icon: <FiImage />,
      color: "blue",
    },
    {
      title: "Total Clients",
      value: clientsCount.toString(),
      icon: <FiUsers />,
      color: "green",
    },
    {
      title: "Unread Messages",
      value: unreadMessages.toString(),
      icon: <FiMail />,
      color: "purple",
    },
  ];

  return (
    <>
      <title>Admin Dashboard</title>
      <meta name="robots" content="noindex, nofollow" />

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back! Here's an overview of your content.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            title="Refresh data"
          >
            <FiRefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <IconCard
              key={index}
              variant="stats"
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Recent Messages */}
        <RecentMessages />
      </div>
    </>
  );
}

export default Dashboard;
