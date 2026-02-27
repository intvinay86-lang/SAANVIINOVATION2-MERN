import PhoneInputWithCountry from "react-phone-number-input";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FiAlertCircle } from "react-icons/fi";

/**
 * PhoneInput Component with Country Code Selection using react-phone-number-input
 *
 * @param {string} value - Full phone number with country code (e.g., "+919876543210")
 * @param {function} onChange - Callback when phone number changes, receives full number
 * @param {function} onBlur - Callback when input loses focus
 * @param {string} error - Error message to display
 * @param {boolean} touched - Whether the field has been touched
 * @param {boolean} required - Whether the field is required
 * @param {string} className - Additional CSS classes for the container
 * @param {string} label - Label text for the input
 * @param {string} id - ID for the input element
 */
function PhoneInput({
  value = "",
  onChange,
  onBlur,
  error = "",
  touched = false,
  required = false,
  className = "",
  label = "Phone",
  id = "phone",
}) {
  // Normalize the phone number to E.164 format
  const normalizePhoneNumber = (phoneValue) => {
    if (!phoneValue) return "";

    // Remove spaces from the phone number
    const cleanValue = phoneValue.replace(/\s+/g, "");

    // If it already starts with +, return as is
    if (cleanValue.startsWith("+")) {
      return cleanValue;
    }

    // If it doesn't start with +, add it
    return `+${cleanValue}`;
  };

  const normalizedValue = normalizePhoneNumber(value);

  const handleChange = (phoneValue) => {
    onChange(phoneValue || "");
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  // Validate phone number
  const isValid = normalizedValue
    ? isValidPhoneNumber(normalizedValue)
    : !required;
  const validationError =
    normalizedValue && !isValid ? "Invalid phone number format" : "";
  const displayError = touched && (error || validationError);

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-700 mb-2"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          {label} {required && <span className="text-orange-500">*</span>}
        </label>
      )}

      <div>
        <PhoneInputWithCountry
          international
          defaultCountry="IN"
          value={normalizedValue}
          onChange={handleChange}
          onBlur={handleBlur}
          id={id}
          placeholder="Enter phone number"
          style={{
            display: "flex",
            gap: "0.5rem",
          }}
        />
      </div>

      {/* Error Message */}
      {displayError && (
        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
          <FiAlertCircle className="w-4 h-4" />
          <span>{error || validationError}</span>
        </div>
      )}

      <style>{`
        .PhoneInput {
          display: flex !important;
          gap: 0.5rem !important;
        }

        .PhoneInputCountry {
          padding: 0.75rem 1rem !important;
          border: ${displayError ? "2px solid #f87171" : "2px solid #fed7aa"} !important;
          border-radius: 0.5rem !important;
          background: white !important;
          transition: all 0.3s !important;
        }

        .PhoneInputCountry:focus-within {
          border-color: ${displayError ? "#ef4444" : "#f97316"} !important;
          box-shadow: 0 0 0 2px ${displayError ? "rgba(239, 68, 68, 0.2)" : "rgba(249, 115, 22, 0.2)"} !important;
          outline: none !important;
        }

        .PhoneInputInput {
          flex: 1 !important;
          padding: 0.75rem 1rem !important;
          border: ${displayError ? "2px solid #f87171" : "2px solid #fed7aa"} !important;
          border-radius: 0.5rem !important;
          background: white !important;
          color: #111827 !important;
          font-family: 'Orbitron', 'Courier New', monospace !important;
          transition: all 0.3s !important;
          outline: none !important;
        }

        .PhoneInputInput:focus {
          border-color: ${displayError ? "#ef4444" : "#f97316"} !important;
          box-shadow: 0 0 0 2px ${displayError ? "rgba(239, 68, 68, 0.2)" : "rgba(249, 115, 22, 0.2)"} !important;
        }

        .PhoneInputInput::placeholder {
          color: #9ca3af !important;
        }
      `}</style>
    </div>
  );
}

export default PhoneInput;
