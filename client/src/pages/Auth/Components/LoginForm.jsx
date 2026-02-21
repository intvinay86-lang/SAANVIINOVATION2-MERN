import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
  selectAuthLoading,
  selectAuthError,
} from "../../../redux/slices/authSlice";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const isLoading = useSelector(selectAuthLoading);
  const loginError = useSelector(selectAuthError);

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Mock credentials
  const mockCredentials = {
    email: "admin@saanviinnovation.com",
    password: "admin123",
  };

  // Clear Redux error when user types
  useEffect(() => {
    if (loginError) {
      dispatch(clearError());
    }
  }, [watch("email"), watch("password"), loginError, dispatch]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    dispatch(loginStart());

    // Simulate API call delay
    setTimeout(() => {
      if (
        data.email === mockCredentials.email &&
        data.password === mockCredentials.password
      ) {
        const user = {
          email: data.email,
          name: "Admin User",
          role: "Administrator",
        };

        dispatch(loginSuccess({ user, rememberMe: data.rememberMe }));
        toast.success("Login successful! Welcome back.");
        navigate("/admin");
      } else {
        dispatch(loginFailure("Invalid email or password"));
        toast.error("Invalid email or password. Please try again.");
      }
    }, 500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="example@gmail.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            {...register("rememberMe")}
            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
            Remember me
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <FiLogIn />
              <span>Login</span>
            </>
          )}
        </button>
      </form>

      {/* Demo Credentials */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center mb-2 font-semibold">
          Demo Credentials:
        </p>
        <p className="text-xs text-gray-600 text-center">
          Email: admin@saanviinnovation.com
        </p>
        <p className="text-xs text-gray-600 text-center">Password: admin123</p>
      </div>
    </div>
  );
}

export default LoginForm;
