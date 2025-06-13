import express from "express";
import {
  getFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  getFriendRequests,
  getFriendStatus,
} from "../controllers/friendController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
// router.use(protect);

// Get all friends
router.get("/", getFriends);

// Get friend requests
router.get("/requests", getFriendRequests);

// Get friend status with another user
router.get("/status/:userId", getFriendStatus);

// Send friend request
router.post("/request/:userId", sendFriendRequest);

// Accept friend request
router.put("/accept/:requestId", acceptFriendRequest);

// Reject friend request
router.put("/reject/:requestId", rejectFriendRequest);

// Remove friend
router.delete("/:friendId", removeFriend);

export default router;
