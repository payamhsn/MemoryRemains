import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    trustedPerson: {
      fullName: String,
      email: String,
      phoneNumber: String,
      predefinedMessage: String,
    },
    inactivityPeriod: {
      type: Number,
      default: 3, // Default to 3 months
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    previousLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
