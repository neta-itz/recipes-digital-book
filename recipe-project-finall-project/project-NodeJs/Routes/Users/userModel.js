const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  resetPassword: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: true },
  favorites: [
    { type: mongoose.Schema.Types.ObjectId, default: [null], ref: "Recipe" },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
