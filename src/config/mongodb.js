import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URL;
    
    if (!mongoURL) {
      throw new Error("MONGO_URL not defined in .env");
    }

    await mongoose.connect(mongoURL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};