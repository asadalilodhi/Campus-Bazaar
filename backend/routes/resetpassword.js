const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required." });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.password = password;
    await user.save();

    console.log(`✅ Password updated for ${username}`);
    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("❌ Error resetting password:", err.message);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
