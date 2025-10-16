import mongoose from "mongoose";

// Define the address schema (for better structure)
const addressSchema = new mongoose.Schema({
  firstLine: {
    type: String,
    required: [true, "Address line 1 is required"],
    trim: true,
  },
  secondLine: {
    type: String,
    trim: true,
  },
  pincode: {
    type: String,
    required: [true, "Pincode is required"],
  },
});

// Define the main user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    address: {
      type: addressSchema,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Export the model
const User = mongoose.model("User", userSchema);
export default User;
