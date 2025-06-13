import mongoose, { Schema, Document } from "mongoose";

interface ITemplate extends Document {
  name: string;
  type: "task" | "project";
  data: any; // JSON for task/project structure
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const templateSchema: Schema<ITemplate> = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["task", "project"], required: true },
  data: { type: Schema.Types.Mixed, required: true }, // e.g., { title: String, status: String }
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

// Index for performance (e.g., name, type)
templateSchema.index({ name: 1, type: 1 });

export const Template = mongoose.model<ITemplate>("Template", templateSchema);
