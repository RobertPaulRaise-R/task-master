import mongoose, { Schema, Document } from "mongoose";

interface IProject extends Document {
  name: string;
  description?: string;
  teamMembers: mongoose.Types.ObjectId[];
  tasks: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema: Schema<IProject> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: null },
    teamMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Index for performance (e.g., name, teamMembers)
projectSchema.index({ name: 1, teamMembers: 1 });

export default mongoose.model<IProject>("Project", projectSchema);
