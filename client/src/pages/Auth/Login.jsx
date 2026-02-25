import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/authSelectors";
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
      <title>Admin Login</title>
      <meta
        name="description"
        content="Admin login page for SAANVI INNOVATION dashboard"
      />
      <meta name="robots" content="noindex, nofollow" />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
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
