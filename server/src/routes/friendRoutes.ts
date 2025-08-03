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

router.use(protect);

router.get("/", getFriends);

router.get("/requests", getFriendRequests);

router.get("/status/:userId", getFriendStatus);

router.post("/request/:userId", sendFriendRequest);

// Accept friend request
router.put("/accept/:requestId", acceptFriendRequest);

// Reject friend request
router.put("/reject/:requestId", rejectFriendRequest);

// Remove friend
router.delete("/:friendId", removeFriend);

export default router;
