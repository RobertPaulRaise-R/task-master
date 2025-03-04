import mongoose, { Schema, Document } from "mongoose";

interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  message: string;
  type: "task" | "project" | "team";
  isRead: boolean;
  timestamp: Date;
}

const notificationSchema: Schema<INotification> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true }, // e.g., "Task X due in 1 hour"
  type: { type: String, enum: ["task", "project", "team"], required: true },
  isRead: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

// Index for performance (e.g., userId, timestamp)
notificationSchema.index({ userId: 1, timestamp: -1 });

export default mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
