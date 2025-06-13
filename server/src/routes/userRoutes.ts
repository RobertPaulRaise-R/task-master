import express, {
  Request,
  Response,
  NextFunction,
  Router,
  RequestHandler,
} from "express"; // Import NextFunction
import multer from "multer";

import {
  registerUser,
  getUser,
  loginUser,
  uploadAvatar,
  logoutUser,
  isAuthenticaed,
} from "../controllers/userController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getUser);
router.post("/", registerUser as RequestHandler);
router.get("/auth", isAuthenticaed as RequestHandler);
router.post("/login", loginUser as RequestHandler);
router.post("/logout", logoutUser);
router.post(
  "/:id/avatar",
  upload.single("avatar"),
  uploadAvatar as RequestHandler
);

export default router;
