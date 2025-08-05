import mongoose, { Schema, Document } from "mongoose";

interface ITeam extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  tasks: mongoose.Types.ObjectId[];
  project: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema: Schema<ITeam> = new Schema(
  {
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

teamSchema.index({ name: 1, members: 1 });

export const Team = mongoose.model<ITeam>("Team", teamSchema);
