import express from "express";
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
const uplaod = multer({ storage });

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/auth", isAuthenticaed);
router.post("/:id/avatar", uplaod.single("avatar"), uploadAvatar);

router.get("/", getUser);

export default router;
