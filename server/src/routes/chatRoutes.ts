import { Request, Response, NextFunction, RequestHandler } from "express";
import express from "express";
import { createChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", createChat as RequestHandler);

export default router;
