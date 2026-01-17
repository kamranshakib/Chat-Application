import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("MONGODB CONNECTED");
  } catch (error) {
    console.error("Error connection to MONGODB:", error);
    process.exit(1);
  }
};
