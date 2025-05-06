import mongoose, { Schema, Document } from "mongoose";

interface ITeam extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  tasks: mongoose.Types.ObjectId[];
  project: mongoose.Types.ObjectId;
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
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Index for performance (e.g., name, members)
teamSchema.index({ name: 1, members: 1 });

export default mongoose.model<ITeam>("Team", teamSchema);
