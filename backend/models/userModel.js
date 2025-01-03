const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
      trim: true,
    },
    userName: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: Array,
      default: [],
    },
    images: {
      type: Object,
    },
    shopName: {
      type: String,
      trim: true,
      default: ""
    },
    status: {
      type: Boolean,
      default:false,
    },
    vendorStatus: {
      type: Boolean,
      default: false,
  },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
