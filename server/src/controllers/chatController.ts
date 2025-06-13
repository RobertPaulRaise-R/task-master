import { Request, Response } from "express";
import { Message } from "../models/Message.js";
import { Chat } from "../models/Chat.js";
import { Friend } from "../models/Friend.js";
import { Server } from "socket.io";

interface AuthenticatedUser {
  _id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

let io: Server;

export const setIO = (socketIO: Server) => {
  io = socketIO;
};

/**
 * @description Create a new chat
 * @route POST /api/chats
 * @access Private
 */
export const createChat = async (req: Request, res: Response) => {
  try {
    const chat = new Chat({ ...req.body, lastMessageAt: new Date() });

    if (!chat) {
      return res.status(400).json({ message: "Cannot create chat instance" });
    }

    const savedChat = await chat.save();

    res.status(201).json(savedChat);
  } catch (error) {
    console.error("Error creating chat:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res
      .status(500)
      .json({ message: "Failed to create chat", error: errorMessage });
  }
};

/**
 * @description Send a new message in a chat
 * @route POST /api/messages
 * @access Private
 */
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, content, senderId, attachments = [] } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const message = new Message({
      chatId,
      senderId,
      content,
      attachments,
    });

    const savedMessage = await message.save();

    chat.lastMessageAt = savedMessage.timestamp;
    await chat.save();

    res.status(200).json(savedMessage);
  } catch (error) {
    console.error("Error sending message:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res
      .status(500)
      .json({ message: "Failed to send message", error: errorMessage });
  }
};

/**
 * @description Get all messages for a specific chat
 * @route GET /api/messages/:chatId
 * @access Private
 */
export const getChatMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId })
      .sort({ timestamp: -1 })
      .populate("senderId", "name avatar");

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res
      .status(500)
      .json({ message: "Failed to fetch chat messages", error: errorMessage });
  }
};

/**
 * @description Get all chats for the authenticated user
 * @route GET /api/chats/user
 * @access Private
 */
export const getUserChats = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    const chats = await Chat.find({
      participants: userId,
    })
      .populate({
        path: "participants",
        select: "_id name avatar",
      })
      .sort({ lastMessageAt: -1 });

    const filteredChats = await Promise.all(
      chats.map(async (chat) => {
        if (chat.type === "direct") {
          const friendParticipant = chat.participants.find(
            (participant: any) =>
              participant && participant._id && !participant._id.equals(userId)
          );

          if (!friendParticipant) {
            console.warn(
              `Direct chat ${chat._id} missing a second participant or participant._id.`
            );
            return null;
          }
          const friendId = friendParticipant._id;

          const friendship = await Friend.findOne({
            $or: [
              { user: userId, friend: friendId, status: "accepted" },
              { user: friendId, friend: userId, status: "accepted" },
            ],
          });

          if (!friendship) {
            return null;
          }
          return chat;
        }
        return chat;
      })
    );

    const validChats = filteredChats.filter((chat) => chat !== null);

    res.status(200).json(validChats);
  } catch (error) {
    console.error("Error fetching user chats:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res
      .status(500)
      .json({ message: "Internal server error", error: errorMessage });
  }
};
