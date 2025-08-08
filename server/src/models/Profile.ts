import mongoose, { Schema } from "mongoose";

export interface IProfile extends Document {
    userId: mongoose.Types.ObjectId;
    workspaceId: mongoose.Types.ObjectId;
    bio: string;
    avatarUrl: string;
    jobTitle: string;
    department: string;
    createdAt: Date;
    updatedAt: Date;
}

const profileSchema = new Schema<IProfile>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    workspaceId: {
        type: Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true,
    },
    bio: {
        type: String,
        trim: true,
    },
    avatarUrl: {
        type: String,
        trim: true,
    },
    jobTitle: {
        type: String,
        trim: true,
    },
    department: {
        type: String,
        trim: true,
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

profileSchema.index({ userId: 1, workspaceId: 1 });

export const Profile = mongoose.model<IProfile>("Profile", profileSchema);
