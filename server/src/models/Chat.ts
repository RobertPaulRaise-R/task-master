import mongoose, { Schema, Document } from "mongoose";

interface IChat extends Document {
  participants: mongoose.Types.ObjectId[]; // Users or teams involved
  type: "direct" | "group" | "team"; // Type of chat
  lastMessageAt: Date; // Timestamp of the most recent message
  name?: string; // Optional name for group and team chats
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema: Schema<IChat> = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, refPath: "type" }],
    type: { type: String, enum: ["direct", "group", "team"], required: true },
    lastMessageAt: { type: Date, default: Date.now },
    name: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Index for performance
chatSchema.index({ participants: 1, lastMessageAt: -1 });

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
