import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "In Review" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: Date;
  projectId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}

const taskSchema: Schema<ITask> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "In Review", "Done"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

taskSchema.index({ status: 1, dueDate: 1, projectId: 1 });

export default mongoose.model<ITask>("Task", taskSchema);
