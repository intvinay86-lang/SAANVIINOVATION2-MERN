import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              SAANVI INNOVATION
            </h1>
          </div>
          {/* Login Card */}
          <LoginForm />

          {/* Back to Home */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
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
