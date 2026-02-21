import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Globe3D from "../../../components/Globe3D";

function TechHero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef([]);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate title with glitch effect
      tl.from(titleRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });

      // Animate stats
      tl.from(
        statsRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
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
        "-=0.3",
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen bg-black overflow-hidden"
      data-scroll-section
    >
      {/* Matrix-style background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_95%,#f97316_95%,#f97316_100%)] bg-[length:100%_20px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_95%,#f97316_95%,#f97316_100%)] bg-[length:20px_100%]"></div>
      </div>

      {/* Binary code background */}
      <div className="absolute inset-0 opacity-5 font-mono text-xs text-orange-500 overflow-hidden">
        <div className="whitespace-pre leading-tight">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i}>
              {Array.from({ length: 200 }, () =>
                Math.random() > 0.5 ? "1" : "0",
              ).join("")}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="min-h-screen flex items-center">
          <div className="w-full py-16 md:py-20">
            {/* Mobile Layout - Vertical Stack */}
            <div className="lg:hidden space-y-8">
              {/* Main Title */}
              <div
                ref={titleRef}
                className="space-y-2 md:space-y-4 text-center"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  <div
                    className="text-white font-mono tracking-wider"
                    style={{
                      fontFamily: "'Orbitron', 'Courier New', monospace",
                    }}
                  >
                    WHERE INNOVATION
                  </div>
                  <div
                    className="text-orange-500 font-mono tracking-wider"
                    style={{
                      fontFamily: "'Orbitron', 'Courier New', monospace",
                    }}
                  >
                    MEETS IMPACT
                  </div>
                </h1>
              </div>

              {/* 3D Globe */}
              <div className="relative" data-scroll data-scroll-speed="0.3">
                <div className="relative">
                  {/* Glowing effect behind globe */}
                  <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full"></div>

                  {/* 3D Globe */}
                  <div className="relative z-10 w-full h-full">
                    <Globe3D />
                  </div>

                  {/* Animated rings */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-full h-full border-2 border-orange-500/20 rounded-full animate-ping"
                      style={{ animationDuration: "3s" }}
                    ></div>
                  </div>

                  {/* Floating keywords */}
                  <div className="absolute top-10 right-0 text-orange-500 font-mono text-[10px] sm:text-xs opacity-50">
                    INNOVATIVE
                  </div>
                  <div className="absolute top-1/4 left-0 text-orange-500 font-mono text-[10px] sm:text-xs opacity-50">
                    RELIABLE
                  </div>
                  <div className="absolute bottom-1/4 right-10 text-orange-500 font-mono text-[10px] sm:text-xs opacity-50">
                    SCALABLE
                  </div>
                  <div className="absolute bottom-10 left-10 text-orange-500 font-mono text-[10px] sm:text-xs opacity-50">
                    PROFESSIONAL
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div
                  ref={addToRefs}
                  className="space-y-1 md:space-y-2 border border-orange-500/30 p-2 sm:p-3 rounded-lg bg-orange-500/5 backdrop-blur-sm"
                  data-scroll
                  data-scroll-speed="0.5"
                >
                  <div
                    className="text-2xl sm:text-3xl font-bold text-orange-500 font-mono"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  >
                    50+
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-mono">
                    Projects Delivered
                  </div>
                </div>

                <div
                  ref={addToRefs}
                  className="space-y-1 md:space-y-2 border border-orange-500/30 p-2 sm:p-3 rounded-lg bg-orange-500/5 backdrop-blur-sm"
                  data-scroll
                  data-scroll-speed="0.6"
                >
                  <div
                    className="text-2xl sm:text-3xl font-bold text-orange-500 font-mono"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  >
                    30+
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-mono">
                    Happy Clients
                  </div>
                </div>

                <div
                  ref={addToRefs}
                  className="space-y-1 md:space-y-2 border border-orange-500/30 p-2 sm:p-3 rounded-lg bg-orange-500/5 backdrop-blur-sm"
                  data-scroll
                  data-scroll-speed="0.7"
                >
                  <div
                    className="text-2xl sm:text-3xl font-bold text-orange-500 font-mono"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  >
                    5+
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-mono">
                    Years Experience
                  </div>
                </div>
              </div>

              {/* Description */}
              <div ref={descRef} className="space-y-4 text-center">
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-mono">
                  <span className="text-orange-500">
                    CUTTING-EDGE TECHNOLOGY
                  </span>{" "}
                  MEETS{" "}
                  <span className="text-orange-500">CREATIVE EXCELLENCE</span>.
                  TRANSFORMING IDEAS INTO{" "}
                  <span className="text-orange-500">DIGITAL REALITY</span> — WEB
                  DEVELOPMENT, MOBILE APPS, AND COMPREHENSIVE DIGITAL SOLUTIONS.
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    to="/contact"
                    className="group relative px-6 py-3 bg-orange-500 text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-orange-400 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  </Link>

                  <Link
                    to="/about"
                    className="px-6 py-3 border-2 border-orange-500 text-orange-500 font-bold font-mono text-xs uppercase tracking-wider hover:bg-orange-500 hover:text-black transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            {/* Desktop Layout - 2 Columns */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Content */}
              <div className="space-y-12">
                {/* Main Title */}
                <div ref={titleRef} className="space-y-4">
                  <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight">
                    <div
                      className="text-white font-mono tracking-wider"
                      style={{
                        fontFamily: "'Orbitron', 'Courier New', monospace",
                      }}
                    >
                      WHERE INNOVATION
                    </div>
                    <div
                      className="text-orange-500 font-mono tracking-wider"
                      style={{
                        fontFamily: "'Orbitron', 'Courier New', monospace",
                      }}
                    >
                      MEETS IMPACT
                    </div>
                  </h1>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6 xl:gap-8">
                  <div
                    ref={addToRefs}
                    className="space-y-2 border border-orange-500/30 p-4 rounded-lg bg-orange-500/5 backdrop-blur-sm"
                    data-scroll
                    data-scroll-speed="0.5"
                  >
                    <div
                      className="text-4xl xl:text-5xl font-bold text-orange-500 font-mono"
                      style={{ fontFamily: "'Orbitron', monospace" }}
                    >
                      50+
                    </div>
                    <div className="text-xs xl:text-sm text-gray-400 uppercase tracking-wider font-mono">
                      Projects Delivered
                    </div>
                  </div>

                  <div
                    ref={addToRefs}
                    className="space-y-2 border border-orange-500/30 p-4 rounded-lg bg-orange-500/5 backdrop-blur-sm"
                    data-scroll
                    data-scroll-speed="0.6"
                  >
                    <div
                      className="text-4xl xl:text-5xl font-bold text-orange-500 font-mono"
                      style={{ fontFamily: "'Orbitron', monospace" }}
                    >
                      30+
                    </div>
                    <div className="text-xs xl:text-sm text-gray-400 uppercase tracking-wider font-mono">
                      Happy Clients
                    </div>
                  </div>

                  <div
                    ref={addToRefs}
                    className="space-y-2 border border-orange-500/30 p-4 rounded-lg bg-orange-500/5 backdrop-blur-sm"
                    data-scroll
                    data-scroll-speed="0.7"
                  >
                    <div
                      className="text-4xl xl:text-5xl font-bold text-orange-500 font-mono"
                      style={{ fontFamily: "'Orbitron', monospace" }}
                    >
                      5+
                    </div>
                    <div className="text-xs xl:text-sm text-gray-400 uppercase tracking-wider font-mono">
                      Years Experience
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div ref={descRef} className="space-y-6">
                  <p className="text-gray-300 text-sm xl:text-base leading-relaxed font-mono max-w-xl">
                    <span className="text-orange-500">
                      CUTTING-EDGE TECHNOLOGY
                    </span>{" "}
                    MEETS{" "}
                    <span className="text-orange-500">CREATIVE EXCELLENCE</span>
                    . TRANSFORMING IDEAS INTO{" "}
                    <span className="text-orange-500">DIGITAL REALITY</span> —
                    WEB DEVELOPMENT, MOBILE APPS, AND COMPREHENSIVE DIGITAL
                    SOLUTIONS.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/contact"
                      className="group relative px-8 py-4 bg-orange-500 text-black font-bold font-mono text-sm uppercase tracking-wider hover:bg-orange-400 transition-all duration-300 overflow-hidden"
                    >
                      <span className="relative z-10">Get Started</span>
                      <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                    </Link>

                    <Link
                      to="/about"
                      className="px-8 py-4 border-2 border-orange-500 text-orange-500 font-bold font-mono text-sm uppercase tracking-wider hover:bg-orange-500 hover:text-black transition-all duration-300"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Content - 3D Globe */}
              <div className="relative" data-scroll data-scroll-speed="0.3">
                <div className="relative">
                  {/* Glowing effect behind globe */}
                  <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full"></div>

                  {/* 3D Globe */}
                  <div className="relative z-10 w-full h-full">
                    <Globe3D />
                  </div>

                  {/* Animated rings */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-full h-full border-2 border-orange-500/20 rounded-full animate-ping"
                      style={{ animationDuration: "3s" }}
                    ></div>
                  </div>

                  {/* Floating keywords */}
                  <div className="absolute top-10 right-0 text-orange-500 font-mono text-xs opacity-50">
                    INNOVATIVE
                  </div>
                  <div className="absolute top-1/4 left-0 text-orange-500 font-mono text-xs opacity-50">
                    RELIABLE
                  </div>
                  <div className="absolute bottom-1/4 right-10 text-orange-500 font-mono text-xs opacity-50">
                    SCALABLE
                  </div>
                  <div className="absolute bottom-10 left-10 text-orange-500 font-mono text-xs opacity-50">
                    PROFESSIONAL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent animate-scan"></div>
      </div>
    </div>
  );
}

export default TechHero;
