import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainSiteData } from "../../../features/siteData/siteDataSlice";
import {
  selectSiteData,
  selectSiteDataLoading,
} from "../../../features/siteData/siteDataSelectors";

function ClientsSection() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const isLoading = useSelector(selectSiteDataLoading);

  useEffect(() => {
    if (!siteData) {
      dispatch(getMainSiteData());
    }
  }, [dispatch, siteData]);

  const clients = siteData?.clients || [];
  const homeSettings = siteData?.homeSettings || {};

  const badge = homeSettings.clientsSectionBadge || "Trusted Partners";
  const title = homeSettings.clientsSectionTitle || "Our Clients";
  const description =
    homeSettings.clientsSectionDescription ||
    "Trusted by leading companies worldwide to deliver exceptional digital solutions and drive business growth.";

  if (isLoading && !siteData) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8 flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </section>
    );
  }

  if (!clients || clients.length === 0) {
    return null;
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
          {clients.map((client, index) => (
            <div
              key={client.id || index}
              className="group flex items-center justify-center opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                className="max-w-full h-12 md:h-16 object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientsSection;
