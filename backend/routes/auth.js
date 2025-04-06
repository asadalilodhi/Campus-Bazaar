const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

console.log("✅ auth.js loaded");

// Login route
router.post('/login', async (req, res) => {
  console.log("🚀 /api/auth/login route hit");

  const { username, password } = req.body;
  console.log("📥 Received credentials:", { username, password });

  if (!username || !password) {
    console.log("⚠️ Missing username or password");
    return res.status(400).json({ msg: "Please provide both username and password" });
  }

  try {
    // Step 1: Find user by username
    const user = await User.findOne({ username: username.trim() });
    console.log("🔎 User fetched from DB:", user);

    // Step 2: If no user found
    if (!user) {
      console.log("❌ No user found with username:", username);
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    // Step 3: Compare passwords
    if (user.password !== password.trim()) {
      console.log("❌ Password does not match");
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    // Step 4: Generate token
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log("✅ Login successful for user:", user.username);
    res.status(200).json({ token });
  } catch (err) {
    console.error("❌ Error during login:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
