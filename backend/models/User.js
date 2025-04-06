const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  sellerId: mongoose.Schema.Types.Mixed,
});

console.log("✅ User model loaded");

// Prevent OverwriteModelError by checking if it's already registered
module.exports = mongoose.models.User || mongoose.model('User', userSchema, 'users');
``
