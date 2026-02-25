import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";
import { loginUser, clearError } from "../../../features/auth/authSlice";
import {
  selectAuthLoading,
  selectAuthError,
} from "../../../features/auth/authSelectors";

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
    setError,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

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
    try {
      await dispatch(
        loginUser({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        }),
      ).unwrap();

      toast.success("Login successful! Welcome back.");
      navigate("/admin");
    } catch (error) {
      // Handle different error types
      if (typeof error === "string") {
        toast.error(error);
      } else if (error?.errors) {
        // Handle validation errors from backend (422)
        Object.keys(error.errors).forEach((field) => {
          const messages = error.errors[field];
          setError(field, {
            type: "server",
            message: Array.isArray(messages) ? messages[0] : messages,
          });
        });
        toast.error("Please check the form for errors");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Admin Login
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Backend Error Message */}
        {loginError && typeof loginError === "string" && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 text-center">{loginError}</p>
          </div>
        )}

        {/* Email Field */}
        <div>
          <label className="block text-gray-900 font-medium mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-500" />
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
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 outline-none text-gray-900 placeholder-gray-400 ${
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
          <label className="block text-gray-900 font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-gray-500" />
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
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 outline-none text-gray-900 placeholder-gray-400 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
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
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
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
    </div>
  );
}

export default LoginForm;
