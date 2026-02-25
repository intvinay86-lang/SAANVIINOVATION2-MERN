import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainSiteData } from "../../features/siteData/siteDataSlice";
import { selectSiteData } from "../../features/siteData/siteDataSelectors";

function Terms() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);

  // Get terms settings with fallbacks
  const termsSettings = siteData?.termsSettings || {};

  const heroTitle = termsSettings.heroTitle || "TERMS & CONDITIONS";
  const heroSubtitle =
    termsSettings.heroSubtitle ||
    "PLEASE READ THESE TERMS CAREFULLY BEFORE USING OUR SERVICES";
  const lastUpdated = termsSettings.lastUpdated || "February 2026";
  const content = termsSettings.content || "";

  useEffect(() => {
    dispatch(getMainSiteData());
  }, [dispatch]);

  return (
    <>
      <title>Terms & Conditions</title>
      <meta
        name="description"
        content="Read the terms and conditions for using our services. Learn about our policies, user responsibilities, and service agreements."
      />
      <meta
        name="keywords"
        content="terms and conditions, service agreement, user policy, legal terms"
      />
      <meta property="og:title" content="Terms & Conditions" />
      <meta
        property="og:description"
        content="Terms and conditions for our services."
      />

      <div className="bg-white">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-orange-50 to-white border-b border-orange-100">
          <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-wide"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {heroTitle.split(" ").map((word, index) => (
                  <span key={index}>
                    {word === "CONDITIONS" ? (
                      <span className="text-orange-500">{word}</span>
                    ) : (
                      word
                    )}
                    {index < heroTitle.split(" ").length - 1 && " "}
                  </span>
                ))}
              </h1>
              <p
                className="text-gray-600 text-sm md:text-base tracking-wide"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {heroSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            {content ? (
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <>
                <h1>Default content</h1>
              </>
            )}

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Last Updated: {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Terms;
