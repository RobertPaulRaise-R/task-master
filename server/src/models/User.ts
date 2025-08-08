import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
    name: string;
    email: string;
    username: string;
    password: string;
    workspaces: [{ workspaceId: mongoose.Types.ObjectId, role: "admin" | "member" | "guest" }];
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
        workspaces: [{
            workspaceId: {
                type: Schema.Types.ObjectId,
                ref: 'Workspace',
                required: true,
            },
            role: {
                type: String,
                enum: ['admin', 'member', 'guest'],
                default: 'member',
            },
        }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.comparePassword = function(
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre<IUserDocument>("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.index({ email: 1 });
userSchema.index({ 'workspaces.workspaceId': 1 });

export const User = mongoose.model<IUserDocument>("User", userSchema);
