import express, { Request, RequestHandler, Response } from "express";
import {
    createProject,
    deleteProjectById,
    getProjectById,
    getProjects
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProjects as RequestHandler);
router.get("/:id", getProjectById as RequestHandler);
router.post("/", protect, createProject as RequestHandler);
router.delete("/:id", deleteProjectById as RequestHandler);

export default router;
