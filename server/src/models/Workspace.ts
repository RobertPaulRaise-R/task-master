import mongoose, { Schema } from 'mongoose';

interface IWorkspace {
  name: string;
  description?: string;
  visibility: 'public' | 'private';
  members: Array<{
    user: Schema.Types.ObjectId;
    role: 'admin' | 'member';
  }>;
  projects: Schema.Types.ObjectId[];
  teams: Schema.Types.ObjectId[];
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  settings?: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
  };
}

const workspaceSchema: Schema<IWorkspace> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: null,
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'private',
    },
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        role: {
          type: String,
          enum: ['admin', 'member'],
          default: 'member',
        },
      },
    ],
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Team',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    settings: {
      theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light',
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

workspaceSchema.index({ 'members.user': 1 });
workspaceSchema.index({ createdBy: 1 });

export const Workspace = mongoose.model<IWorkspace>("Workspace", workspaceSchema);
