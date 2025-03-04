import mongoose, { Schema, Document } from "mongoose";

interface IChat extends Document {
  participants: mongoose.Types.ObjectId[]; // Users or teams involved (e.g., [userId, userId] or [teamId])
  type: "direct" | "group" | "team"; // Type of chat (direct between users, group, or team-based)
  lastMessageAt: Date; // Timestamp of the most recent message
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema: Schema<IChat> = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, refPath: "type" }], // Could reference 'User' or 'Team' dynamically
    type: { type: String, enum: ["direct", "group", "team"], required: true },
    lastMessageAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Index for performance (e.g., participants, lastMessageAt)
chatSchema.index({ participants: 1, lastMessageAt: -1 });

export default mongoose.model<IChat>("Chat", chatSchema);
