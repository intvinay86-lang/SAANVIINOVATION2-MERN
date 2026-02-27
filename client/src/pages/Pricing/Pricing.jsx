import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PricingCard from "./Components/PricingCard";
import WhyChooseSection from "./Components/WhyChooseSection";
import CTASection from "../../components/sections/CTASection";
import { getMainSiteData } from "../../features/siteData/siteDataSlice";
import { selectSiteData } from "../../features/siteData/siteDataSelectors";

function Pricing() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);

  useEffect(() => {
    dispatch(getMainSiteData());
  }, [dispatch]);

  const pricingSettings = siteData?.pricingSettings || {};

  const heroTitle = pricingSettings.heroTitle || "SIMPLE, TRANSPARENT PRICING";
  const heroSubtitle =
    pricingSettings.heroSubtitle ||
    "CHOOSE THE PERFECT PLAN FOR YOUR PROJECT. NO HIDDEN FEES, NO SURPRISES.";
  const pricingPlans = pricingSettings.pricingPlans || [];
  const ctaTitle = pricingSettings.ctaTitle || "Need a Custom Solution?";
  const ctaDescription =
    pricingSettings.ctaDescription ||
    "We can create a tailored package that perfectly fits your specific requirements and budget";
  const ctaButtonText =
    pricingSettings.ctaButtonText || "Contact Us for Custom Quote";

  return (
    <>
      <title>Pricing Plans</title>
      <meta
        name="description"
        content="Explore our competitive pricing plans for web development, mobile apps, and software solutions. Choose the perfect package for your business needs."
      />
      <meta
        name="keywords"
        content="pricing, web development cost, mobile app pricing, software development packages, affordable web solutions"
      />
      <meta property="og:title" content="Pricing Plans" />
      <meta
        property="og:description"
        content="Affordable pricing plans for all your digital needs."
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
                {heroTitle.split(" ").map((word, index) =>
                  word === "TRANSPARENT" ? (
                    <span key={index} className="text-orange-500">
                      {word}{" "}
                    </span>
                  ) : (
                    word + " "
                  ),
                )}
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
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-16">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>

          {/* Features Comparison Section */}
          <WhyChooseSection />

          {/* Contact CTA */}
          <CTASection
            variant="custom"
            title={
              <>
                {ctaTitle.split(" ").map((word, index) =>
                  word === "Custom" ? (
                    <span
                      key={index}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600"
                    >
                      {word}{" "}
                    </span>
                  ) : (
                    word + " "
                  ),
                )}
              </>
            }
            subtitle={ctaDescription}
            buttonText={ctaButtonText}
          />
        </div>
      </div>
    </>
  );
}

export default Pricing;
