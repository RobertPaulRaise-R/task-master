import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string; // Hash this in practice
  avatar?: string; // URL or path to avatar
  settings?: {
    theme: "light" | "dark";
    notifications: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: null },
    settings: {
      theme: { type: String, enum: ["light", "dark"], default: "light" },
      notifications: { type: Boolean, default: true },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically manages createdAt/updatedAt
  }
);

// Index for email lookups
userSchema.index({ email: 1 });

export default mongoose.model<IUser>("User", userSchema);
