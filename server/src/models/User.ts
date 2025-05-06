import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  password: string; // Hash this in practice
  avatar?: { data: Buffer | undefined; contentType: string | undefined }; // URL or path to avatar
  company: string;
  position: string;
  settings?: {
    theme: "light" | "dark";
    notifications: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface IUserDocument extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUserDocument> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    avatar: {
      data: { type: Buffer },
      contentType: { type: String },
    },
    company: { type: String, default: "" },
    position: { type: String, default: "" },
    settings: {
      theme: { type: String, enum: ["light", "dark"], default: "light" },
      notifications: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true, // Automatically manages createdAt/updatedAt
  }
);

userSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Index for email lookups
userSchema.index({ email: 1 });

export default mongoose.model<IUserDocument>("User", userSchema);
