import express, { RequestHandler } from "express";
import {
    createTask,
    deleteTask,
    updateTask,
    getUserNotDoneTasks,
    getTasksByProject,
    getTaskById,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserNotDoneTasks as RequestHandler);
router.get("/project", getTasksByProject as RequestHandler);
router.get("/:id", protect, getTaskById as RequestHandler);
router.post("/", protect, createTask as RequestHandler);
router.put("/:id", protect, updateTask as RequestHandler);
router.delete("/:id", protect, deleteTask);

export default router;
