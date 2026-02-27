import { useState } from "react";
import PhoneInputLib, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PhoneInput = ({
  value,
  onChange,
  required = false,
  label = "Phone Number",
}) => {
  const [touched, setTouched] = useState(false);

  const isEmpty = !value;
  const isInvalid = value && !isValidPhoneNumber(value);

  const displayError = touched && (required ? isEmpty || isInvalid : isInvalid);

  return (
    <div style={{ width: "100%" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "6px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {label}
        </label>
      )}

      <PhoneInputLib
        defaultCountry="IN"
        international={true}
        withCountryCallingCode={true}
        value={value}
        onChange={onChange}
        onBlur={() => setTouched(true)}
        countryCallingCodeEditable={false}
      />

      {displayError && (
        <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "6px" }}>
          {isEmpty ? "Phone number is required" : "Enter a valid phone number"}
        </p>
      )}

      <style>{`
        .PhoneInput {
          display: flex !important;
          gap: 0.5rem !important;
        }

        .PhoneInputCountrySelect {
          padding: 0.75rem 1rem !important;
          border: ${displayError ? "2px solid #f87171" : "2px solid #fed7aa"} !important;
          border-radius: 0.5rem !important;
          background: white !important;
          font-size: 14px !important;
          outline: none !important;
        }

        .PhoneInputInput {
          flex: 1 !important;
          padding: 0.75rem 1rem !important;
          border: ${displayError ? "2px solid #f87171" : "2px solid #fed7aa"} !important;
          border-radius: 0.5rem !important;
          background: white !important;
          outline: none !important;
        }

        .PhoneInputInput:focus,
        .PhoneInputCountrySelect:focus {
          border-color: ${displayError ? "#ef4444" : "#f97316"} !important;
          box-shadow: 0 0 0 2px ${
            displayError ? "rgba(239, 68, 68, 0.2)" : "rgba(249, 115, 22, 0.2)"
          } !important;
        }
      `}</style>
    </div>
  );
};

export default PhoneInput;
