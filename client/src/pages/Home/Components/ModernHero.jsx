import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function ModernHero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate title
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
      });

      // Animate subtitle
      tl.from(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5",
      );

      // Animate description
      tl.from(
        descRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4",
      );

      // Animate button
      tl.from(
        btnRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.3",
      );

      // Animate image (desktop only)
      if (imageRef.current) {
        tl.from(
          imageRef.current,
          {
            x: 100,
            opacity: 0,
            duration: 1,
          },
          "-=0.8",
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden min-h-max md:min-h-screen"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Modern gradient overlay with subtle shadow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 via-slate-800/55 to-slate-800/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/40 via-transparent to-slate-800/40"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-0 lg:h-[calc(100vh-80px)] flex items-center relative z-10">
        <div className="w-full">
          {/* Centered Content */}
          <div className="text-white text-center max-w-5xl mx-auto">
            <h1
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 lg:mb-6 leading-tight"
            >
              Innovative Solutions
              <br />
              <span className="text-orange-500">For Every Business</span>
              <br />
              Need.
            </h1>

            <p
              ref={descRef}
              className="text-gray-100 text-lg md:text-lg lg:text-xl mb-6 lg:mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              Let our expert team transform your vision into reality with
              cutting-edge web development, mobile apps, and digital solutions
              that drive growth and success.
            </p>

            <div ref={btnRef} className="mb-8 flex justify-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 lg:px-10 lg:py-5 rounded-xl font-bold text-base lg:text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 hover:scale-105 hover:-translate-y-1"
              >
                <span>Start Your Project</span>
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                {/* Animated glow effect */}
                <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-8 mt-8 lg:mt-10 max-w-3xl mx-auto">
              <div>
                <div className="text-3xl md:text-3xl lg:text-4xl font-bold text-orange-500">
                  50+
                </div>
                <div className="text-white text-base lg:text-lg font-semibold">
                  Projects Done
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-3xl lg:text-4xl font-bold text-orange-500">
                  30+
                </div>
                <div className="text-white text-base lg:text-lg font-semibold">
                  Happy Clients
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-3xl lg:text-4xl font-bold text-orange-500">
                  5+
                </div>
                <div className="text-white text-base lg:text-lg font-semibold">
                  Years Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 -mb-px">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}

export default ModernHero;
