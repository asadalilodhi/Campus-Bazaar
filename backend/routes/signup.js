const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Student = mongoose.model('Student');

router.post('/', async (req, res) => {
  console.log("🔔 Signup route hit");

  const { studentId, email, username, password, confirmPassword } = req.body;
  console.log("📥 Received signup data:", req.body);

  try {
    const studentRecord = await Student.findOne({ studentId, email });
    if (!studentRecord) {
      console.log("❌ Invalid student ID or email");
      return res.status(400).json({ message: "Invalid student ID or email" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("❌ Username already taken");
      return res.status(400).json({ message: "Username already taken" });
    }

    const emailUsed = await User.findOne({ email });
    if (emailUsed) {
      console.log("❌ Email already registered");
      return res.status(400).json({ message: "An account with this student email already exists" });
    }

    if (password !== confirmPassword) {
      console.log("❌ Passwords do not match");
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const newUser = new User({
      username,
      password,
      email,
      sellerId: null
    });

    await newUser.save();
    console.log("✅ User created successfully:", username);
    return res.status(201).json({ message: "Signup successful" });

  } catch (err) {
    console.error("❌ Signup error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
