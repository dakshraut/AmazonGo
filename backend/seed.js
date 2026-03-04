import mongoose from "mongoose";
import User from "./models/User.js";
import Product from "./models/Product.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create test user
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123"
    });
    await user.save();
    console.log("User created");

    // Create sample products
    const products = [
      {
        name: "Wireless Bluetooth Headphones",
        category: "Electronics",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        tags: ["audio", "wireless", "bluetooth"]
      },
      {
        name: "Smart Fitness Watch",
        category: "Wearables",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
        tags: ["fitness", "smartwatch", "health"]
      },
      {
        name: "Organic Coffee Beans",
        category: "Food & Beverage",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
        tags: ["coffee", "organic", "beverages"]
      },
      {
        name: "Ergonomic Office Chair",
        category: "Furniture",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
        tags: ["office", "chair", "ergonomic"]
      },
      {
        name: "Yoga Mat Premium",
        category: "Sports & Fitness",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
        tags: ["yoga", "fitness", "exercise"]
      },
      {
        name: "LED Desk Lamp",
        category: "Home & Garden",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
        tags: ["lighting", "desk", "LED"]
      },
      {
        name: "Stainless Steel Water Bottle",
        category: "Kitchen",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop",
        tags: ["water bottle", "stainless steel", "eco-friendly"]
      },
      {
        name: "Wireless Charging Pad",
        category: "Electronics",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
        tags: ["charging", "wireless", "accessories"]
      }
    ];

    await Product.insertMany(products);
    console.log(`${products.length} products created`);

  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();