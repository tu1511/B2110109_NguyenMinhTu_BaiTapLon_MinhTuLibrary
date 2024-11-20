import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Failed to connect to MongoDB. Error: ${error.message}`);
    process.exit(1); // Thoát ứng dụng nếu không thể kết nối
  }
};
