import mongoose, { Schema } from "mongoose";

interface IFriends extends Document {
    workspaceId: mongoose.Types.ObjectId;
    userId1: mongoose.Types.ObjectId;
    userId2: mongoose.Types.ObjectId;
    status: "pending" | "accepted" | "rejected";
    requestedBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const friendsSchema: Schema<IFriends> = new Schema(
    {
        workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
        userId1: { type: Schema.Types.ObjectId, ref: "User", required: true },
        userId2: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
        requestedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

friendsSchema.index({ workspaceId: 1, userId1: 1, userId2: 1 }, { unique: true });
friendsSchema.index({ workspaceId: 1, status: 1 });

export const Friends = mongoose.model<IFriends>("Friends", friendsSchema);
