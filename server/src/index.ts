import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

import connectDb from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import { setIO } from "./controllers/chatController.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const server = createServer(app);

const io = new SocketIOServer(server, {
    cors: { origin: "http://localhost:5173", credentials: true },
});

setIO(io);

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/teams", teamRoutes);

io.on("connection", (socket) => {
    console.log(`Socket connected. id: ${socket.id}`);
});

// Start server
const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
