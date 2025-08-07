import express, { RequestHandler } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTasks as RequestHandler);
router.post("/", protect, createTask as RequestHandler);
router.patch("/:id", protect, updateTask as RequestHandler);
router.delete("/:id", protect, deleteTask);

export default router;
