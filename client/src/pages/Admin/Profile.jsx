import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiSave,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { userService } from "../../features/user/userService";

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    setValue,
  } = useForm();

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await userService.getProfile();
      if (response.success) {
        setValue("name", response.data.name);
        setValue("email", response.data.email);
      }
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  const onSubmitProfile = async (data) => {
    setIsLoading(true);
    try {
      const response = await userService.updateProfile(data);
      if (response.success) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update profile";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitPassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsPasswordLoading(true);
    try {
      const response = await userService.changePassword(
        data.currentPassword,
        data.newPassword,
      );
      if (response.success) {
        toast.success("Password changed successfully");
        resetPassword();
        setShowPasswordForm(false);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to change password";
      toast.error(message);
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Profile Settings
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Profile Information
          </h2>
          <form
            onSubmit={handleSubmitProfile(onSubmitProfile)}
            className="space-y-4"
          >
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  {...registerProfile("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                    profileErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your name"
                />
              </div>
              {profileErrors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {profileErrors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
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
                  {...registerProfile("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                    profileErrors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {profileErrors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {profileErrors.email.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <FiSave />
                  <span>Update Profile</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Change Password
            </h2>
            {!showPasswordForm && (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Change Password
              </button>
            )}
          </div>

          {showPasswordForm && (
            <form
              onSubmit={handleSubmitPassword(onSubmitPassword)}
              className="space-y-4"
            >
              {/* Current Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    {...registerPassword("currentPassword", {
                      required: "Current password is required",
                    })}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                      passwordErrors.currentPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {showCurrentPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>
                {passwordErrors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {passwordErrors.currentPassword.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    {...registerPassword("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                      passwordErrors.newPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {showNewPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {passwordErrors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...registerPassword("confirmPassword", {
                      required: "Please confirm your password",
                    })}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                      passwordErrors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {passwordErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isPasswordLoading}
                  className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPasswordLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Changing...</span>
                    </>
                  ) : (
                    <>
                      <FiLock />
                      <span>Change Password</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    resetPassword();
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
