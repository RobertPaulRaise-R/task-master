import express, { RequestHandler } from "express"
import { createWorkspace, getWorkspaces } from "../controllers/workspaceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getWorkspaces as RequestHandler);
router.post("/", protect, createWorkspace as RequestHandler);

export default router;
