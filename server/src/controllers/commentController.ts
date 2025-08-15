import { Request, Response } from "express"
import { Comment } from "../models/Comment.js";

export const createComment = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(400).json({ message: "Require userId" });
        }

        const { workspaceId, taskId, content } = req.body;
        if (!workspaceId || !taskId || !content) {
            res.status(400).json({ message: "Requires workspaceId, taskId, content" });
        }

        const comment = await Comment.create({
            workspaceId,
            taskId,
            content,
            createdBy: userId,
        });

        comment.save();

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: "Error creating comment" });
    }
}


export const getCommentsByTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.query;
        const comments = await Comment.find({ taskId: taskId }).populate("createdBy", "name");

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching getCommentsByTask" });
    }
}
