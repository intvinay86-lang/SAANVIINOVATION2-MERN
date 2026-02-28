import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import PhoneInputLib, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PhoneInput = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  label = "Phone Number",
  id = "phone",
}) => {
  const [internalTouched, setInternalTouched] = useState(false);
  const isTouched = touched !== undefined ? touched : internalTouched;

  const isEmpty = !value;
  const isInvalid = value && !isValidPhoneNumber(value);

  const displayError =
    isTouched && (error || (required ? isEmpty || isInvalid : isInvalid));
  const errorMessage =
    error ||
    (isEmpty ? "Phone number is required" : "Enter a valid phone number");

  const handleBlur = () => {
    setInternalTouched(true);
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-orange-500"> *</span>}
        </label>
      )}

      <PhoneInputLib
        id={id}
        defaultCountry="IN"
        international={true}
        withCountryCallingCode={true}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        countryCallingCodeEditable={false}
      />

      {displayError && (
        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
          <FiAlertCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </div>
      )}

      <style>{`
        .PhoneInput {
          display: flex !important;
          gap: 0.5rem !important;
        }

        .PhoneInputCountrySelect {
          padding: 0.625rem 1rem !important;
          border: ${displayError ? "2px solid #f87171" : "2px solid #fed7aa"} !important;
          border-radius: 0.5rem !important;
          background: white !important;
          font-size: 14px !important;
          outline: none !important;
        }

        .PhoneInputInput {
          flex: 1 !important;
          padding: 0.625rem 1rem !important;
          border: ${displayError ? "2px solid #f87171" : "2px solid #fed7aa"} !important;
          border-radius: 0.5rem !important;
          background: white !important;
          outline: none !important;
          color: #111827 !important;
        }

        .PhoneInputInput::placeholder {
          color: #9ca3af !important;
        }

        .PhoneInputInput:focus,
        .PhoneInputCountrySelect:focus {
          border-color: ${displayError ? "#ef4444" : "#f97316"} !important;
          box-shadow: 0 0 0 2px ${
            displayError ? "rgba(239, 68, 68, 0.2)" : "rgba(249, 115, 22, 0.2)"
          } !important;
        }

        @media (min-width: 640px) {
          .PhoneInputCountrySelect,
          .PhoneInputInput {
            padding: 0.75rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PhoneInput;
