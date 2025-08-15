import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createComment, getCommentsByTask } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", protect, createComment);
router.get("/", protect, getCommentsByTask);

export default router;
