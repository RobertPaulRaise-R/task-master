import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js";
import { Friend } from "../models/Friend.js";
import mongoose from "mongoose";
import { Workspace } from "../models/Workspace.js";

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Not authenticated." });
        }

        const user = await User.findById(userId);

        res.status(200).json(user);
    } catch (error) {
        console.error("Error in getUser:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id; // This is the ID of the logged-in user
        const { query: email } = req.query;

        if (!userId) {
            // Ensure userId is available (from authentication middleware)
            return res.status(401).json({ message: "Not authenticated." });
        }

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const friend = await User.findOne({ email: email }).select(
            "name avatar"
        );

        if (!friend) {
            return res.status(404).json({ message: "User not found" });
        }

        const friendId = friend._id as mongoose.Types.ObjectId;

        // Prevent searching for yourself
        if (userId.toString() === friendId.toString()) {
            // You might want to return a different status or a special message here
            // For example, status: 'self' to display "You" or hide the button
            return res
                .status(200)
                .json({ friend: friend.toObject(), status: "self" });
        }

        const friendship = await Friend.findOne({
            $or: [
                { user: userId, friend: friendId },
                { user: friendId, friend: userId },
            ],
        });

        let status = friendship?.status || "none";
        let requestDirection = "none"; // 'sent' or 'received'

        if (friendship && friendship.status === "pending") {
            // Check who sent the request
            if (friendship.user.toString() === userId.toString()) {
                requestDirection = "sent"; // I sent the request
            } else if (friendship.friend.toString() === userId.toString()) {
                requestDirection = "received"; // They sent me the request
            }
        }

        res.status(200).json({
            friend: friend.toObject(), // Send as plain object
            status: status,
            requestDirection: requestDirection, // Add this new field
        });
    } catch (error) {
        console.error("Error in getUserByEmail:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, username, email, password, avatar, settings, company } =
            req.body;
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const user = new User({
            name,
            username,
            email,
            password,
            avatar,
            settings,
            company,
        });
        await user.save();

        const workspace = new Workspace({
            name: `${name}'s Personal Workspace`,
            visibility: 'private',
            members: [{ user: user._id, role: 'admin' }],
            createdBy: user._id,
            projects: [],
            teams: [],
        });
        await workspace.save();

        res.status(201).json({ user, workspace });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Internal Server Error" });
        next(error);
    }
};

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: "30d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            partitioned: true,
        });

        res.status(200).json({
            message: "Logged in successfully",
            user: { id: user._id, email: user.email },
        });
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        res.json({ message: "Logged Out" });
    } catch (error) {
        console.error("Error in logoutUser:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const uploadAvatar = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.avatar = {
            data: req.file?.buffer,
            contentType: req.file?.mimetype,
        };

        await user.save();
        res.status(200).json({ message: "Avatar uploaded" });
    } catch (error) {
        console.error("Error in uploadAvatar:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const isAuthenticaed = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res
                .status(401)
                .json({ message: "User is not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: string;
        };
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        }
        console.error("Error in isAuthenticaed:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
