import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("user");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("✅ Password updated successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/"), 2200);
    } else {
      toast.error(data.message || "Something went wrong.");
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="logo-container">
        <img src={logo} alt="Campus Bazaar Logo" className="login-logo" />
      </div>

      <div className="login-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Reset Password</h2>

          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="button" onClick={handleReset}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
