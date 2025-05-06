import { Request, Response } from "express";

import Message from "../models/Message.js";
import { Friend } from "../models/Friend.js";
import { Chat } from "../models/Chat.js";

export const createChat = async (req: Request, res: Response) => {
  try {
    const chat = new Chat({ ...req.body, lastMessageAt: new Date() });
    const savedChat = await chat.save();
    res.status(201).json(savedChat);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, content, senderId, attachments = [] } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) throw new Error("Chat not found");

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
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const getChatMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId })
      .sort({ timestamp: -1 })
      .populate("senderId", "name avatar");
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

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
        select: "_id", //  Select only the _id field.  You can add 'name' or other fields if needed.
        // populate: { // Removed nested population, handle friendships separately
        //   path: 'friendship',
        //   select: 'status',
        //   match: { status: 'accepted' },
        // },
      })
      .sort({ lastMessageAt: -1 }); // Sort by most recent message

    // 3.  Filter out any participants that are not friends.  This is necessary
    //     because the 'participants' field of the Chat model can contain users
    //     who are not friends.  We only want to show chats with friends.
    const filteredChats = await Promise.all(
      chats.map(async (chat) => {
        if (chat.type === "direct") {
          //  For direct chats, find the friend.
          const friendId = chat.participants.find(
            (participant: any) => !participant._id.equals(userId)
          );

          if (!friendId) {
            return null; //  Should not happen, but handle it to be safe.
          }
          // Check friendship status
          const friendship = await Friend.findOne({
            $or: [
              { user: userId, friend: friendId },
              { user: friendId, friend: userId },
            ],
            status: "accepted",
          });

          if (!friendship) {
            return null; //  Remove the chat if the users are not friends.
          }
          return chat; // Return the chat if they are friends
        }
        return chat; // Return group and team chats without filtering
      })
    );

    // 4. Remove null chats (chats where the users are not friends)
    const validChats = filteredChats.filter((chat) => chat !== null);

    // 5.  Send the response.
    res.status(200).json(validChats);
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
