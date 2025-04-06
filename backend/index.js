const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Mongoose User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  sellerId: mongoose.Schema.Types.Mixed,
});
const User = mongoose.model('User', userSchema, 'users');
console.log('✅ User model loaded');

// ✅ Mongoose Student Schema
const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  email: { type: String, required: true }
});
const Student = mongoose.model('Student', studentSchema, 'students');
console.log('✅ Student model loaded');

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'campusbazaar',
})
  .then(async () => {
    console.log('✅ MongoDB connected successfully');

    // 🔍 Fetch and print all usernames and passwords on startup
    try {
      const users = await User.find({}, { username: 1, password: 1, _id: 0 });
      console.log('📋 All Users (username & password):');
      users.forEach(user => {
        console.log(`👤 ${user.username} | 🔑 ${user.password}`);
      });
    } catch (err) {
      console.error('❌ Error fetching users:', err.message);
    }
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
const authRoutes = require('./routes/auth');
const signupRoutes = require('./routes/signup');
const forgotRoutes = require('./routes/forgot');
const resetPasswordRoute = require('./routes/resetpassword');
app.use('/api/reset-password', resetPasswordRoute);
app.use('/api/forgot', forgotRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/signup', signupRoutes);

// ✅ Server Startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
