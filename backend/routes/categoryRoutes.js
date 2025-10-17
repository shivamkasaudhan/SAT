// routes/categoryRoutes.js
import express from "express";
import upload from "../models/multerConfig.js";
import Category from "../models/Category.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to protect admin routes
const protectAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Admin access only" });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Add Category — Admin Only
router.post("/add", protectAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !req.file) {
      return res
        .status(400)
        .json({ message: "Category name and image are required" });
    }

    const category = await Category.create({
      name,
      image: req.file.path, // Cloudinary URL
    });

    res
      .status(201)
      .json({ success: true, message: "Category added successfully", category });
  } catch (error) {
    console.error("Category Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get all categories — Public
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

export default router;
