import mongoose, { Schema, Document } from "mongoose";

interface IActivity extends Document {
  action: string;
  userId: mongoose.Types.ObjectId;
  taskId?: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
  timestamp: Date;
}

const activitySchema: Schema<IActivity> = new Schema({
  action: { type: String, required: true }, // e.g., "User X moved Task Y to Done"
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  taskId: { type: Schema.Types.ObjectId, ref: "Task", default: null },
  projectId: { type: Schema.Types.ObjectId, ref: "Project", default: null },
  timestamp: { type: Date, default: Date.now },
});

// Index for performance (e.g., timestamp, userId)
activitySchema.index({ timestamp: -1, userId: 1 });

export default mongoose.model<IActivity>("Activity", activitySchema);
