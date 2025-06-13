import { NextFunction, Request, Response } from "express";
import { Friend } from "../models/Friend.js";
import { User } from "../models/User.js";

// Get all friends
export const getFriends = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req._id;

  const friendships = await Friend.find({
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
    friendship.user._id.toString() === userId
      ? friendship.friend
      : friendship.user
  );

  res.status(200).json(friends);
};

// Get friend requests
export const getFriendRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req._id;

  const requests = await Friend.find({
    friend: userId,
    status: "pending",
  }).populate("user", "-password");

  res.status(200).json(requests);
};

// Get friend status with another user
export const getFriendStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req._id;
  const otherUserId = req.params.userId;

  const friendship = await Friend.findOne({
    $or: [
      { user: userId, friend: otherUserId },
      { user: otherUserId, friend: userId },
    ],
  });

  res.status(200).json({ status: friendship?.status || "none" });
};

// Send friend request
export const sendFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req._id;
  const friendId = req.params.userId;

  // Check if user exists
  const user = await User.findById(friendId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Check if friendship already exists
  const existingFriendship = await Friend.findOne({
    $or: [
      { user: userId, friend: friendId },
      { user: friendId, friend: userId },
    ],
  });

  if (existingFriendship) {
    res.status(400);
    throw new Error("Friendship already exists");
  }

  const friendship = await Friend.create({
    user: userId,
    friend: friendId,
    status: "pending",
  });

  res.status(201).json(friendship);
};

// Accept friend request
export const acceptFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req._id;
  const requestId = req.params.requestId;

  const friendship = await Friend.findOne({
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

// Reject friend request
export const rejectFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req._id;
  const requestId = req.params.requestId;

  const friendship = await Friend.findOne({
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

// Remove friend
export const removeFriend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req._id;
  const friendId = req.params.friendId;

  const friendship = await Friend.findOne({
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
