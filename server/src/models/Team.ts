import mongoose, { Schema, Document } from "mongoose";

interface ITeam extends Document {
    workspaceId: mongoose.Types.ObjectId;
    name: string;
    description: string;
    members: [{ userId: mongoose.Types.ObjectId, role: "leader" | "member" }];
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const teamSchema: Schema<ITeam> = new Schema(
    {
        workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
        name: { type: String, required: true },
        description: { type: String, trim: true },
        members: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            role: {
                type: String,
                enum: ['leader', 'member'],
                default: 'member',
            },
        }],
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

teamSchema.index({ workspaceId: 1, name: 1 });

export const Team = mongoose.model<ITeam>("Team", teamSchema);
