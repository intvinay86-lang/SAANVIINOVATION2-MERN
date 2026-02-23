import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/slices/authSlice";
import LoginForm from "./Components/LoginForm";

function Login() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <title>Admin Login - SAANVI INNOVATION</title>
      <meta
        name="description"
        content="Admin login page for SAANVI INNOVATION dashboard"
      />
      <meta name="robots" content="noindex, nofollow" />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <NavLink
            to="/"
            className="flex items-center justify-center space-x-2 group mb-8"
          >
            <div className="flex items-center">
              {/* Logo Icon */}
              <div className="relative">
                <div className="w-10 h-10 border-2 border-orange-500 transform rotate-45 group-hover:rotate-90 transition-transform duration-300"></div>
                <div className="absolute inset-0 w-10 h-10 border-2 border-orange-500/50 transform rotate-45 scale-110 group-hover:scale-125 transition-transform duration-300"></div>
              </div>

              {/* Logo Text */}
              <div className="ml-3">
                <div
                  className="text-xl md:text-2xl font-bold text-orange-500 tracking-wider"
                  style={{
                    fontFamily: "'Orbitron', 'Courier New', monospace",
                  }}
                >
                  SAANVI
                </div>
                <div
                  className="text-[10px] text-gray-600 tracking-widest -mt-1"
                  style={{
                    fontFamily: "'Orbitron', 'Courier New', monospace",
                  }}
                >
                  INNOVATION
                </div>
              </div>
            </div>
          </NavLink>

          {/* Login Card */}
          <LoginForm />

          {/* Back to Home */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
