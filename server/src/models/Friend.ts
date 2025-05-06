import mongoose, { Schema } from "mongoose";

interface IFriend extends Document {
  user: mongoose.Types.ObjectId;
  friend: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const friendSchema: Schema<IFriend> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    friend: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Index to quickly find friendships for a user
friendSchema.index({ user: 1, friend: 1 }, { unique: true });
friendSchema.index({ friend: 1, user: 1 }); // For efficient querying from either user's perspective

export const Friend = mongoose.model<IFriend>("Friend", friendSchema);
