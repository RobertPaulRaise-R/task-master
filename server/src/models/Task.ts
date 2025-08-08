import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
    workspaceId: mongoose.Types.ObjectId;
    projectId: mongoose.Types.ObjectId;
    name: string;
    description: string;
    assignedTo: mongoose.Types.ObjectId;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high";
    dueDate: Date;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema: Schema<ITask> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["todo", "in_progress", "done"],
            default: "todo",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "low",
        },
        dueDate: {
            type: Date,
            default: null,
        },
        projectId: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            default: null,
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        workspaceId: {
            type: Schema.Types.ObjectId,
            ref: "Workspace",
            default: null,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
);

taskSchema.index({ workspaceId: 1, projectId: 1, status: 1 });

export const Task = mongoose.model<ITask>("Task", taskSchema);
