import mongoose, { Schema, Document } from "mongoose";

interface IMessage extends Document {
  chatId: mongoose.Types.ObjectId; // Reference to the chat this message belongs to
  senderId: mongoose.Types.ObjectId; // User who sent the message
  content: string; // Message text
  timestamp: Date; // When the message was sent
  isRead: boolean; // Whether the recipient(s) have read it
  attachments?: string[]; // Optional URLs or paths to files (e.g., images)
}

const messageSchema: Schema<IMessage> = new Schema({
  chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  attachments: [{ type: String, default: null }], // URLs or paths (e.g., S3, Cloudinary)
});

// Index for performance (e.g., chatId, timestamp, senderId)
messageSchema.index({ chatId: 1, timestamp: -1, senderId: 1 });

export default mongoose.model<IMessage>("Message", messageSchema);
