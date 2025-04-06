const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  email: { type: String, required: true }
});

console.log("✅ Student model loaded");
module.exports = mongoose.model('Student', StudentSchema, 'students');
