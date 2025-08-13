import express, {
    Request,
    Response,
    NextFunction,
    Router,
    RequestHandler,
} from "express";
import multer from "multer";

import {
    registerUser,
    loginUser,
    logoutUser,
    isAuthenticaed,
    getUserByEmail,
    getUser,
    getUsersByWorkspace
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", protect, getUser as RequestHandler);
router.get("/workspace", protect, getUsersByWorkspace as RequestHandler);
router.get("/request", protect, getUserByEmail as RequestHandler);
router.post("/", registerUser as RequestHandler);
router.get("/auth", isAuthenticaed as RequestHandler);
router.post("/login", loginUser as RequestHandler);
router.post("/logout", logoutUser);
/*
router.post(
    "/:id/avatar",
    upload.single("avatar"),
    uploadAvatar as RequestHandler
);
*/

export default router;
