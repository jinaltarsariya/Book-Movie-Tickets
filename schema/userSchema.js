const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  mobileNo: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: {
    type: String,
    enum: ["normal_user", "admin_user"],
    default: "normal_user",
    required: true,
  },
  otp: { type: String },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
