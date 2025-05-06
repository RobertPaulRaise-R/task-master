import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import { Request, Response } from "express";

import User from "../models/User.js";

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = User.findById(req.body);
  res.status(200).json(user);
});

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, avatar, settings, company } = req.body;
    const existing = await User.findOne({ email });
    if (existing) res.status(400).json({ messsage: "Email already exists" });

    const user = new User({ name, email, password, avatar, settings, company });
    await user.save();
    res.status(201).json({ message: "User Registered Successfully " });
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please provide email and password" });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Logged in successfully",
    user: { id: user._id, email: user.email }, // Only send non-sensitive data
  });
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  res.json({ message: "Logged Out" });
});

export const uploadAvatar = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.avatar = {
      data: req.file?.buffer,
      contentType: req.file?.mimetype,
    };

    await user.save();
    res.send({ message: "Avatar uploaded" });
  }
);

export const isAuthenticaed = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "User is not authenticated" });
      return;
    }

    const user = jwt.verify(token, process.env.JWT_SECRET!);
    if (!user) {
      res.status(401).json({ message: "Invalid token" });
    }

    res.status(200).json({ user });
  }
);
