import { Request, Response } from "express";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

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
