import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
    clerkId: string;
    name: string;
    email: string;
    username: string;
    workspaces: [{ workspaceId: mongoose.Types.ObjectId, role: "admin" | "member" | "guest" }];
    createdAt: Date;
    updatedAt: Date;
}

interface IUserDocument extends IUser, Document {
    comparePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUserDocument> = new Schema(
    {
        clerkId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true, trim: true },
        workspaces: [{
            workspaceId: {
                type: Schema.Types.ObjectId,
                ref: 'Workspace',
                required: true,
            },
            role: {
                type: String,
                enum: ['admin', 'member', 'guest'],
                default: 'member',
            },
        }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

userSchema.index({ email: 1 });
userSchema.index({ 'workspaces.workspaceId': 1 });

export const User = mongoose.model<IUserDocument>("User", userSchema);
