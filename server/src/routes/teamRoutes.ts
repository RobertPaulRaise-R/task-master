import { RequestHandler, Router } from "express";
import { createTeam } from "../controllers/teamController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, createTeam as RequestHandler);

export default router;
