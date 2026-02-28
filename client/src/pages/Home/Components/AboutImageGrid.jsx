import { useSelector } from "react-redux";
import { selectSiteData } from "../../../features/siteData/siteDataSelectors";
import { getFullImageUrl } from "../../../utils/imageUtils";

function AboutImageGrid() {
  const siteData = useSelector(selectSiteData);

  // Get home settings from Redux
  const homeSettings = siteData?.homeSettings || {};

  const aboutTitle = homeSettings.aboutTitle || "SAANVI INNOVATION";
  const aboutParagraph1 =
    homeSettings.aboutParagraph1 ||
    "Where we elevate digital experiences in web development, mobile applications, and enterprise solutions across India.";
  const aboutParagraph2 =
    homeSettings.aboutParagraph2 ||
    "Our mission is to deliver innovative technology solutions that energize your business and enhance your digital presence.";
  const aboutParagraph3 =
    homeSettings.aboutParagraph3 ||
    "We have a network of satisfied clients across multiple states including Madhya Pradesh, Maharashtra, and Gujarat.";

  // Use getFullImageUrl to handle both relative and absolute URLs
  // Fallback to Pexels images if not set
  const aboutImage1 = getFullImageUrl(
    homeSettings.aboutImage1 ||
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
  );
  const aboutImage2 = getFullImageUrl(
    homeSettings.aboutImage2 ||
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
  );
  const aboutImage3 = getFullImageUrl(
    homeSettings.aboutImage3 ||
      "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
  );

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Content - Bolder, More Readable Typography */}
          <div className="order-2 lg:order-1 space-y-8">
            <div>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-[0.2em] inline-block mb-6">
                About Us
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                {aboutTitle}
              </h2>
            </div>

            {/* Bolder, more readable paragraphs */}
            <div className="space-y-6 text-lg md:text-xl text-justify">
              <p className="text-gray-900 leading-relaxed font-normal">
                {aboutParagraph1}
              </p>

              <p className="text-gray-800 leading-relaxed font-normal">
                {aboutParagraph2}
              </p>

              <p className="text-gray-800 leading-relaxed font-normal">
                {aboutParagraph3}
              </p>
            </div>
          </div>

          {/* Right: Large Image Grid */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image - Top */}
              <div className="col-span-2 overflow-hidden rounded-lg">
                <img
                  src={aboutImage1}
                  alt="Team Collaboration"
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom Left */}
              <div className="overflow-hidden rounded-lg">
                <img
                  src={aboutImage2}
                  alt="Modern Workspace"
                  className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom Right */}
              <div className="overflow-hidden rounded-lg">
                <img
                  src={aboutImage3}
                  alt="Business Meeting"
                  className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutImageGrid;
