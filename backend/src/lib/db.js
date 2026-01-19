import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const {MONGO_URL} = process.env;
    if(!MONGO_URL) throw new Error("MONGO_URL is not set")
    const conn = await mongoose.connect(MONGO_URL);
    console.log("MONGODB CONNECTED");
  } catch (error) {
    console.error("Error connection to MONGODB:", error);
    process.exit(1);
  }
};
