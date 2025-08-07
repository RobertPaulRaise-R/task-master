import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect(process.env.NODE_ENV === "production" ? process.env.MONGODB_URI! : "mongodb://localhost:27017/taskmaster")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error", err));
};

export default connectDb;
