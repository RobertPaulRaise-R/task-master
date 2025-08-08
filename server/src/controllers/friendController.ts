import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js";
import { Friends } from "../models/Friend.js";

export const getFriends = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.user?._id;

    const friendships = await Friends.find({
        $or: [{ user: userId }, { friend: userId }],
        status: "accepted",
    })
        .populate("user", "-password")
        .populate("friend", "-password");

    if (!friendships || friendships.length === 0) {
        res.status(200).json([]);
        return;
    }

    const friends = friendships.map((friendship) =>
        friendship.userId1._id.toString() === userId
            ? friendship.userId2
            : friendship.userId1
    );

    res.status(200).json(friends);
};

// Get friend requests
export const getFriendRequests = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.user?._id;

    const requests = await Friends.find({
        friend: userId,
        status: "pending",
    }).populate("user", "-password");

    res.status(200).json(requests);
};

export const getFriendStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req._id;
    const otherUserId = req.params.userId;

    const friendship = await Friends.findOne({
        $or: [
            { user: userId, friend: otherUserId },
            { user: otherUserId, friend: userId },
        ],
    });

    res.status(200).json({ status: friendship?.status || "none" });
};

export const sendFriendRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.user?._id;
    const friendId = req.params.userId;

    if (!userId) {
        res.status(404);
        throw new Error("UserId required");
    }

    if (!friendId) {
        res.status(404);
        throw new Error("UserId required");
    }

    const user = await User.findById(friendId);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const existingFriendship = await Friends.findOne({
        $or: [
            { user: userId, friend: friendId },
            { user: friendId, friend: userId },
        ],
    });

    if (existingFriendship) {
        res.status(400);
        throw new Error("Friendship already exists");
    }

    const friendship = await Friends.create({
        user: userId,
        friend: friendId,
        status: "pending",
    });

    friendship.save();

    res.status(201).json({
        message: "Friend request sent successfully",
        friendship: friendship.toObject(),
    });
};

export const acceptFriendRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.user?._id;
    const requestId = req.params.requestId;

    console.log(userId, requestId);

    const friendship = await Friends.findOne({
        _id: requestId,
        friend: userId,
        status: "pending",
    });

    if (!friendship) {
        res.status(404);
        throw new Error("Friend request not found");
    }

    friendship.status = "accepted";
    await friendship.save();

    res.status(200).json(friendship);
};

export const rejectFriendRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req._id;
    const requestId = req.params.requestId;

    const friendship = await Friends.findOne({
        _id: requestId,
        friend: userId,
        status: "pending",
    });

    if (!friendship) {
        res.status(404);
        throw new Error("Friend request not found");
    }

    await friendship.deleteOne();

    res.status(200).json({ message: "Friend request rejected" });
};

export const removeFriend = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req._id;
    const friendId = req.params.friendId;

    const friendship = await Friends.findOne({
        $or: [
            { user: userId, friend: friendId },
            { user: friendId, friend: userId },
        ],
        status: "accepted",
    });

    if (!friendship) {
        res.status(404);
        throw new Error("Friendship not found");
    }

    await friendship.deleteOne();

    res.status(200).json({ message: "Friend removed successfully" });
};
