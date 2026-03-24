// backend/seed-products.js
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    stock: 50,
    rating: 4.5,
    tags: ["audio", "wireless", "headphones"]
  },
  {
    name: "Smart Watch",
    description: "Fitness tracker with heart rate monitor, GPS, and sleep tracking",
    price: 249.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    stock: 30,
    rating: 4.3,
    tags: ["wearable", "fitness", "smartwatch"]
  },
  {
    name: "Cotton T-Shirt",
    description: "100% organic cotton t-shirt, comfortable and breathable",
    price: 24.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    stock: 100,
    rating: 4.7,
    tags: ["clothing", "cotton", "t-shirt"]
  },
  {
    name: "Coffee Maker",
    description: "Programmable coffee maker with built-in grinder",
    price: 89.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb2f2a0e0d",
    stock: 25,
    rating: 4.4,
    tags: ["kitchen", "coffee", "appliance"]
  },
  {
    name: "Yoga Mat",
    description: "Non-slip exercise mat with carrying strap",
    price: 29.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2",
    stock: 75,
    rating: 4.6,
    tags: ["fitness", "yoga", "exercise"]
  },
  {
    name: "Backpack",
    description: "Water-resistant laptop backpack with USB charging port",
    price: 59.99,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    stock: 45,
    rating: 4.5,
    tags: ["bag", "laptop", "travel"]
  }
];

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Added ${products.length} sample products`);

    // Disconnect
    await mongoose.disconnect();
    console.log('✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

seedProducts();