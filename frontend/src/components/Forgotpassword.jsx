import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forgot_pass.css";
import logo from "../assets/logo.png";
import { ArrowLeft } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.info("📨 Reset email sent if credentials are valid.", {
          position: "top-right",
          autoClose: 3000,
          style: { backgroundColor: "#dff0d8", color: "#3c763d", fontWeight: "500" }
        });
      } else {
        toast.error(data.message || "Invalid username or email.", {
          position: "top-right",
          autoClose: 3000,
          style: { backgroundColor: "#f8d7da", color: "#721c24", fontWeight: "500" }
        });
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      toast.error("Server error. Try again later.");
    }
  };
  

  return (
    <div className="forgot-page">
      <ToastContainer />
      <div className="logo-container">
        <img src={logo} alt="Campus Bazaar Logo" className="forgot-logo" />
      </div>

      <div className="forgot-container">
        <ArrowLeft
          style={{ cursor: "pointer", alignSelf: "flex-start" }}
          onClick={() => navigate("/")}
        />

        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Forgot Password</h2>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="button" onClick={handleSendEmail}>
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
