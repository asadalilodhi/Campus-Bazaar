const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { username, email } = req.body;
  console.log("📩 Forgot password request received:", { username, email });

  try {
    const user = await User.findOne({ username, email });
    console.log("🔍 User lookup result:", user);

    if (!user) {
      console.log("❌ No matching user found");
      return res.status(404).json({ message: "Invalid username or email." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // match this name with .env
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Campus Bazaar" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Campus Bazaar Password",
      html: `
        <p>Hi ${username},</p>
        <p>You requested a password reset for your Campus Bazaar account.</p>
        <p><a href="http://localhost:5173/reset-password?user=${username}">Click here to reset your password</a></p>
        <p>If you didn't request this, you can ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", email);

    res.status(200).json({ message: "Reset email sent successfully." });
  } catch (err) {
    console.error("❌ Error during forgot password:", err.message);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
