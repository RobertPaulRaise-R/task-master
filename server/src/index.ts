import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import userRoutes from "./routes/userRoute.js";

dotenv.config();

connectDb();

const PORT = 3000;
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is up and running" });
});

app.use("/api/tasks", taskRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
