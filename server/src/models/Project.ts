import mongoose, { Schema } from "mongoose";

interface IProject extends Document {}

const projectSchema: Schema<IProject> = new Schema({});

export default mongoose.model<IProject>("Project", projectSchema);
