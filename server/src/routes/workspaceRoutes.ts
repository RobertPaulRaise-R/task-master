import express, { RequestHandler } from "express"
import { createWorkspace, getWorkspaces } from "../controllers/workspaceController.js";

const router = express.Router();

router.get("/", getWorkspaces as RequestHandler);
router.post("/", createWorkspace as RequestHandler);

export default router;
