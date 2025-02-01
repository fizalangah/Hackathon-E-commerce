import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URL ) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }

    await mongoose.connect(process.env.MONGODB_URL) 
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};