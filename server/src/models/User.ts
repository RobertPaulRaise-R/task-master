import mongoose, { Schema } from "mongoose";

interface IUser extends Document {}

const userSchema: Schema<IUser> = new Schema({});

export default mongoose.model<IUser>("User", userSchema);
