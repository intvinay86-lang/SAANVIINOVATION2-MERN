import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
import ScrollToTop from "../components/ScrollToTop";
import ProtectedRoute from "../components/ProtectedRoute";

// Lazy load layouts
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));

// Lazy load pages
const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/About/About"));
const Services = lazy(() => import("../pages/Services/Services"));
const Portfolio = lazy(() => import("../pages/Portfolio/Portfolio"));
const PortfolioDetails = lazy(
  () => import("../pages/Portfolio/PortfolioDetails"),
);
const Pricing = lazy(() => import("../pages/Pricing/Pricing"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Terms = lazy(() => import("../pages/Terms/Terms"));
const Privacy = lazy(() => import("../pages/Privacy/Privacy"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));
const SiteInfo = lazy(() => import("../pages/Admin/SiteInfo"));
const ContactSettings = lazy(() => import("../pages/Admin/ContactSettings"));
const FooterSettings = lazy(() => import("../pages/Admin/FooterSettings"));
const Profile = lazy(() => import("../pages/Admin/Profile"));
const NotFound = lazy(() => import("../pages/Errors/NotFound"));
const Login = lazy(() => import("../pages/Auth/Login"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="portfolio/:id" element={<PortfolioDetails />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="contact" element={<Contact />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
          </Route>

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Admin Routes (Protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="siteinfo" element={<SiteInfo />} />
            <Route path="contact" element={<ContactSettings />} />
            <Route path="footer" element={<FooterSettings />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* 404 Not Found - Catch all unmatched routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
