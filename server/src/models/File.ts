import mongoose, { Schema, Document } from "mongoose";

interface IFile extends Document {
  name: string;
  url: string;
  taskId?: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  uploadedAt: Date;
}

const fileSchema: Schema<IFile> = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }, // S3, Cloudinary, or local path
  taskId: { type: Schema.Types.ObjectId, ref: "Task", default: null },
  projectId: { type: Schema.Types.ObjectId, ref: "Project", default: null },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  uploadedAt: { type: Date, default: Date.now },
});

// Index for performance (e.g., userId, taskId)
fileSchema.index({ userId: 1, taskId: 1, projectId: 1 });

export const File = mongoose.model<IFile>("File", fileSchema);
