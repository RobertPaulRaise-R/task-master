import express, { Request, RequestHandler, Response } from "express";
import {
    createProject,
    deleteProjectById,
    getProjectById,
    getProjectsByUser,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", getProjectById as RequestHandler);
router.post("/", protect, createProject as RequestHandler);
router.get("/", protect, getProjectsByUser as RequestHandler);
router.delete("/:id", deleteProjectById as RequestHandler);

export default router;
