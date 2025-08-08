import mongoose, { Schema } from 'mongoose';

interface IWorkspace {
    name: string;
    description?: string;
    visibility: 'public' | 'private';
    createdBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    settings?: {
        notifications?: boolean;
    };
}

const workspaceSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "private"
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
    settings: {
        notification: {
            type: Boolean,
            default: false,
        }
    }
},
    {
        timestamps: true
    });

workspaceSchema.index({ name: 1 });

export const Workspace = mongoose.model<IWorkspace>("Workspace", workspaceSchema);
