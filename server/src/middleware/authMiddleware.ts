import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request type to include _id
declare global {
    namespace Express {
        interface Request {
            _id?: string;
        }
    }
}

export const protect = (req: any, res: any, next: any) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded: any = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ); // Verify with your secret
        req.user = { _id: decoded.id }; // Attach user ID from token payload to req.user
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};
