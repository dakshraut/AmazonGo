import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("ENV MONGODB_URI =", process.env.MONGODB_URI); // debug line

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✓ MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;