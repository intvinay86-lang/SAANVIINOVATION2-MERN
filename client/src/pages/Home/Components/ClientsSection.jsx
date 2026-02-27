import { useSelector } from "react-redux";
import {
  selectSiteData,
  selectSiteDataLoading,
} from "../../../features/siteData/siteDataSelectors";
import { getFullImageUrl } from "../../../utils/imageUtils";

function ClientsSection() {
  const siteData = useSelector(selectSiteData);
  const isLoading = useSelector(selectSiteDataLoading);

  const homeSettings = siteData?.homeSettings || {};

  const badge = homeSettings.clientsSectionBadge || "Trusted Partners";
  const title = homeSettings.clientsSectionTitle || "Our Clients";
  const description =
    homeSettings.clientsSectionDescription ||
    "Trusted by leading companies worldwide to deliver exceptional digital solutions and drive business growth.";

  // Default clients data when no data is found
  const defaultClients = [
    {
      id: 1,
      name: "Tech Corp",
      logo: "https://via.placeholder.com/150x60?text=Tech+Corp",
    },
    {
      id: 2,
      name: "Digital Solutions",
      logo: "https://via.placeholder.com/150x60?text=Digital+Solutions",
    },
    {
      id: 3,
      name: "Innovation Labs",
      logo: "https://via.placeholder.com/150x60?text=Innovation+Labs",
    },
    {
      id: 4,
      name: "Global Systems",
      logo: "https://via.placeholder.com/150x60?text=Global+Systems",
    },
    {
      id: 5,
      name: "Smart Tech",
      logo: "https://via.placeholder.com/150x60?text=Smart+Tech",
    },
    {
      id: 6,
      name: "Future Works",
      logo: "https://via.placeholder.com/150x60?text=Future+Works",
    },
    {
      id: 7,
      name: "Cloud Services",
      logo: "https://via.placeholder.com/150x60?text=Cloud+Services",
    },
    {
      id: 8,
      name: "Data Systems",
      logo: "https://via.placeholder.com/150x60?text=Data+Systems",
    },
  ];

  const clients =
    siteData?.clients && siteData.clients.length > 0
      ? siteData.clients
      : defaultClients;

  if (isLoading && !siteData) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8 flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span
              className="text-orange-500 font-semibold text-lg uppercase tracking-wider bg-orange-50 px-4 py-2 rounded-full"
              style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
            >
              {badge}
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 uppercase tracking-wide"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {title}
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {description}
          </p>
        </div>

        {/* Simple Image Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {clients.map((client, index) => {
            const clientLogo = getFullImageUrl(client.logo || "");

            return (
              <div
                key={client.id || index}
                className="group flex items-center justify-center opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={clientLogo}
                  alt={client.name}
                  loading="lazy"
                  className="max-w-full h-12 md:h-16 object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ClientsSection;
