import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  image: String,
  tags: [String],
  stock: {
    type: Number,
    default: 50
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
