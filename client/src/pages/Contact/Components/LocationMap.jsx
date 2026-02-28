import { useSelector } from "react-redux";
import { selectSiteData } from "../../../features/siteData/siteDataSelectors";

function LocationMap() {
  const siteData = useSelector(selectSiteData);
  const contactSettings = siteData?.contactSettings || {};

  const mapEmbedUrl =
    contactSettings.mapEmbedUrl ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.0234567890123!2d78.203263!3d26.216247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzU4LjUiTiA3OMKwMTInMTEuNyJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin";

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg hover:shadow-xl hover:border-orange-300 transition-all duration-300">
      <div className="p-4 bg-gradient-to-r from-orange-50 to-white border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Our Location</h3>
        <p className="text-sm text-gray-600">Visit us at our office</p>
      </div>

      {/* Google Map Embed */}
      <iframe
        src={mapEmbedUrl}
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="SAANVI INNOVATION Office Location"
        className="w-full"
      ></iframe>
    </div>
  );
}

export default LocationMap;
