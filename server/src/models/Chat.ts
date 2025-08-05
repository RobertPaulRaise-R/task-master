import mongoose, { Schema, Document } from "mongoose";

interface IChat extends Document {
  name?: string;
  participants: mongoose.Types.ObjectId[];
  type: "direct" | "group" | "team";
  lastMessageAt: Date;
  workspaceId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema: Schema<IChat> = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, refPath: "type" }],
    type: { type: String, enum: ["direct", "group", "team"], required: true },
    lastMessageAt: { type: Date, default: Date.now },
    name: { type: String },
    workspaceId: {
        type: Schema.Types.ObjectId,
        ref: 'Workspace',
        default: null,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ participants: 1, lastMessageAt: -1 });

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
