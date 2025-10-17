// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // this will store the Cloudinary image URL
    required: true,
  },
});

export default mongoose.model('Category', categorySchema);
