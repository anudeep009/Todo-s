import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  console.log(`Connecting to mongodb+srv://nagaraja9171@cluster0.vguoo.mongodb.net/<dbname>`);
  try {
    await mongoose.connect(
      `mongodb+srv://nagaraja9171:qbQQzlKZeDSYNIzL@cluster0.vguoo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );  
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;