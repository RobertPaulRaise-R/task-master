import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    status: "active" | "completed" | "on_hold" | "cancelled";
    workspaceId: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema: Schema<IProject> = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: null },
        startDate: { type: Date, default: Date.now() },
        endDate: { type: Date, default: null },
        status: {
            type: String,
            enum: ['active', 'completed', 'on_hold', 'cancelled'],
            default: 'active',
        },
        workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

projectSchema.index({ workspaceId: 1, name: 1 });

export const Project = mongoose.model<IProject>("Project", projectSchema);
