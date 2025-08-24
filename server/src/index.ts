import express, { Request, Response } from "express";
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
import commentRoutes from "./routes/commentRoutes.js";
import { setIO } from "./controllers/chatController.js";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/backend";
import { User } from "./models/User.js";
import { Workspace } from "./models/Workspace.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
const app = express();

const server = createServer(app);

const io = new SocketIOServer(server, {
    cors: { origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_PATH : "http://localhost:5173", credentials: true },
});

setIO(io);

const allowedOrigins = [
    "https://taskley.netlify.app", // production frontend
    "http://localhost:5173"        // dev frontend
];

// Middleware
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use((req, _, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.post("/api/webhooks/clerk/register", express.json(), async (req: Request, res: Response) => {
    console.log(CLERK_WEBHOOK_SECRET);
    if (!CLERK_WEBHOOK_SECRET) {
        throw new Error("Clerk Webhook secret cannot be empty");
    }

    try {
        const payload = JSON.stringify(req.body);

        const headers = {
            "svix-id": req.headers["svix-id"] as string,
            "svix-timestamp": req.headers["svix-timestamp"] as string,
            "svix-signature": req.headers["svix-signature"] as string,
        }

        const wh = new Webhook(CLERK_WEBHOOK_SECRET!);
        const evt = wh.verify(payload, headers) as WebhookEvent;

        if (evt.type === "user.created") {
            const userData = evt.data;

            console.log(userData);

            const { first_name, username, email_addresses } = userData;

            console.log(email_addresses[0].email_address);

            const user = new User({
                clerkId: userData.id,
                name: first_name,
                username,
                email: email_addresses[0].email_address,
            });
            await user.save();

            const workspace = new Workspace({
                name: `${first_name}'s Personal Workspace`,
                visibility: 'private',
                createdBy: user._id,
            });
            await workspace.save();

            const result = await User.updateOne(
                { _id: user._id },
                { $push: { workspaces: { workspaceId: workspace._id, role: "admin" } } }
            );

            res.status(201).json({ result, workspace });
        }
    } catch (error) {
        console.error("❌ Webhook verification failed:", error);
        res.status(400).json({ error: "Invalid signature" });
    }
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/comments", commentRoutes);

io.on("connection", (socket) => {
    console.log(`Socket connected. id: ${socket.id}`);
});

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
