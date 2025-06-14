import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    status: "Planned" | "In Progress" | "Completed" | "On Hold";
    teams?: mongoose.Types.ObjectId[];
    tasks?: mongoose.Types.ObjectId[];
    members?: mongoose.Types.ObjectId[];
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema: Schema<IProject> = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: null },
        startDate: { type: Date },
        endDate: { type: Date },
        status: {
            type: String,
            enum: ["Planned", "In Progress", "Completed", "On Hold"],
            default: "Planned",
        },
        teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
        tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
        members: [{ type: Schema.Types.ObjectId, ref: "User" }],
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

// Index for performance (e.g., name, teamMembers)
projectSchema.index({ name: 1, teamMembers: 1 });

export const Project = mongoose.model<IProject>("Project", projectSchema);
