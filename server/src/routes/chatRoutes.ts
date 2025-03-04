import { Router } from "express";
import {
  createChat,
  getChatMessages,
  sendMessage,
} from "../controllers/chatController.js";

const router = Router();

router.post("/chats", createChat);
router.post("/chats/:chatId/messages", sendMessage);
router.get("/chats/:chatId/messages", getChatMessages);

export default router;
