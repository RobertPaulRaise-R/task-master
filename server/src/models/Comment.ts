import mongoose, { Schema } from "mongoose";
import { type } from "os";
import { ref } from "process";

export interface IComment extends Document {
    workspaceId: mongoose.Types.ObjectId;
    taskId: mongoose.Types.ObjectId;
    parentCommentId: mongoose.Types.ObjectId;
    content: string;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new Schema<IComment>({
    workspaceId: {
        type: Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true,
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    parentCommentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

commentSchema.index({ workspaceId: 1, taskId: 1, parentCommentId: 1, createdAt: 1 });

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
