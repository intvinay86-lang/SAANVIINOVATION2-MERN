import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";

function NotFound() {
  return (
    <>
      <title>404 - Page Not Found | SAANVI INNOVATION</title>
      <meta
        name="description"
        content="The page you are looking for could not be found."
      />
      <meta name="robots" content="noindex, nofollow" />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold text-gray-600 select-none">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            <p className="text-gray-500">Error Code: 404</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <FiHome className="w-5 h-5" />
              <span>Go to Homepage</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 hover:border-orange-500"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
