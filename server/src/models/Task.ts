import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  name: string;
  description: string;
  status: "To Do" | "In Progress" | "In Review" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: Date;
  assignedTo: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

const taskSchema: Schema<ITask> = new Schema(
  {
    name: {
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
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    workspaceId: {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
        default: null,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
    }
  },
  { timestamps: true }
);

taskSchema.index({ status: 1, dueDate: 1, projectId: 1 });

export const Task = mongoose.model<ITask>("Task", taskSchema);
