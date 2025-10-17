// routes/productRoutes.js
import express from "express";
import upload from "../models/multerConfig.js"; // Cloudinary multer config
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to protect admin routes
const protectAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token
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

// ✅ Add Product — Admin Only
router.post("/add", protectAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!name || !price || !description || !category || !req.file) {
      return res
        .status(400)
        .json({ message: "All fields including image are required" });
    }

    // Check if category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      image: req.file.path, // Cloudinary URL
      category,
    });

    res
      .status(201)
      .json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("Product Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get all Products — Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

export default router;
