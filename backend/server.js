import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
// import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Pickup Order System Backend is Running...");
});

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// ✅ Signup route
app.post("/signup", async (req, res) => {
  try {
    const { name, phone, password, address } = req.body;

    // Basic validation
    if (!name || !phone || !password || !address || !address.firstLine || !address.pincode) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User with this phone number already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      address,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Validate input
    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required" });
    }

    // Find user by phone
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: "Invalid phone or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid phone or password" });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
        phone: user.phone,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Token valid for 7 days
    );

    // Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Middleware to protect routes and check admin
const protectAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Admin access only" });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Admin signup route
app.post("/admin/signup", protectAdmin, async (req, res) => {
  try {
    const { name, phone, password, address } = req.body;

    if (!name || !phone || !password || !address || !address.firstLine || !address.pincode) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      phone,
      password: hashedPassword,
      address,
      role: "admin", // force admin role
    });

    res.status(201).json({ message: "Admin created successfully", admin: { id: admin._id, name: admin.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);