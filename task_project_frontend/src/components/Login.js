import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [step, setStep] = useState(1);
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  const sendOTP = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/send-otp`, {
        email,
      });
      setStep(2);
    } catch (err) {
      setError(err.response.data.message || "Error sending OTP");
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/verify-otp`,
        { email, otp }
      );
      setToken(res.data.token);
      // Store token in localStorage or context
    } catch (err) {
      setError(err.response.data.message || "Error verifying OTP");
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Login via Email OTP</h2>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOTP}>Send OTP</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
