import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
// import Header from "../components/layout/Header";
import TechHeader from "../components/layout/TechHeader";
// import Footer from "../components/layout/Footer";
import TechFooter from "../components/layout/TechFooter";

function MainLayout() {
  const scrollRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    // Scroll to top on route change
    scroll.scrollTo(0, { duration: 0, disableLerp: true });

    return () => {
      scroll.destroy();
    };
  }, [location]);
  return (
    <div
      className="min-h-screen bg-black"
      data-scroll-container
      ref={scrollRef}
    >
      <TechHeader />
      <main data-scroll-section className="pt-20">
        <Outlet />
      </main>
      <TechFooter />
    </div>
  );
}

export default MainLayout;
