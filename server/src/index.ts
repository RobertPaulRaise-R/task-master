import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDb from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

connectDb();

const PORT = 3000;
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is up and running" });
});

app.use("/api", taskRoutes);
app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
