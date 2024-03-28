const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: false,
    default: "",
  },
  image: {
    type: String,
    required: false,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Number,
    default: 0,
    required: true,
  },
  is_verified: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
