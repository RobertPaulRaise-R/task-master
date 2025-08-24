import { verifyToken } from "@clerk/backend";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const protect = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    req.userId = payload.sub;

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
