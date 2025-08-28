
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase";
import axios from "axios";


const BackURL=import.meta.env.VITE_API_URL;


const Signup = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // console.log("reCAPTCHA verified", response);
          },
          "expired-callback": () => {
            // console.log("reCAPTCHA expired");
            alert("reCAPTCHA expired. Please try again.");
          },
        }
      );
    }
  };

  const handleGetOtp = async () => {
    if (!mobile) return alert("Please enter a mobile number");

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(
        auth,
        `+91${mobile}`,
        appVerifier
      );
      setConfirmationResult(result);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Error during OTP send", error);
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !confirmationResult) return;

    try {
      // ✅ Confirm OTP with Firebase
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // ✅ Get Firebase ID Token
      const token = await user.getIdToken();
      // console.log("✅ Firebase ID Token:", token);

      // ✅ Send token to backend
      const response = await axios.post(`${BackURL}/api/user/verifyOTP`, {
        tokenId: token,
      });

      if (response.data.message === "OTP verified and user stored") {
        alert("OTP Verified!");
        setIsVerified(true);
        navigate("/Profilepage");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification failed", error);
      alert("Invalid OTP or confirmation failed.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #56ccf2, #2f80ed)",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{ width: "350px", borderRadius: "10px" }}
      >
        <div className="card-title text-center">
          <h2>User Signup</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Enter mobile no.</label>
            <div className="input-group">
              <input
                type="tel"
                className="form-control"
                placeholder="Enter Mobile no."
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={isVerified}
              />
              <button className="btn btn-warning" onClick={handleGetOtp}>
                Get OTP
              </button>
            </div>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Required for RecaptchaVerifier */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Signup;
