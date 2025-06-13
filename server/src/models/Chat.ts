import mongoose, { Schema, Document } from "mongoose";

interface IChat extends Document {
  name?: string;
  participants: mongoose.Types.ObjectId[];
  type: "direct" | "group" | "team";
  lastMessageAt: Date;
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
