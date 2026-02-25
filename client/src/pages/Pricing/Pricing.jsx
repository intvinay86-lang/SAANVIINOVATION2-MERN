import PricingCard from "./Components/PricingCard";
import WhyChooseSection from "./Components/WhyChooseSection";
import CTASection from "../../components/sections/CTASection";
import { pricingPlans } from "./Components/pricingData";

function Pricing() {
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
                SIMPLE, <span className="text-orange-500">TRANSPARENT</span>{" "}
                PRICING
              </h1>
              <p
                className="text-gray-600 text-sm md:text-base tracking-wide"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                CHOOSE THE PERFECT PLAN FOR YOUR PROJECT. NO HIDDEN FEES, NO
                SURPRISES.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 py-16">
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-16">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* Features Comparison Section */}
          <WhyChooseSection />

          {/* Contact CTA */}
          <CTASection
            variant="custom"
            title={
              <>
                Need a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                  Custom Solution?
                </span>
              </>
            }
            subtitle="We can create a tailored package that perfectly fits your specific requirements and budget"
            buttonText="Contact Us for Custom Quote"
          />
        </div>
      </div>
    </>
  );
}

export default Pricing;
