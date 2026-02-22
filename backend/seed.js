import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const hashedPassword = await bcrypt.hash("password123", 10);

    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword
    });

    await user.save();
    console.log("User created");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

seedUser();