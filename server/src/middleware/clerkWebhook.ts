import { WebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";
import { Request, Response } from "express";

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export const clerkWebhook = async (req: Request, res: Response) => {
    console.log(CLERK_WEBHOOK_SECRET);
    if (!CLERK_WEBHOOK_SECRET) {
        throw new Error("Clerk Webhook secret cannot be empty");
    }

    try {
        const payload = JSON.stringify(req.body);

        const headers = {
            "svix-id": req.headers["svix-id"] as string,
            "svix-timestamp": req.headers["svix-timestamp"] as string,
            "svix-signature": req.headers["svix-signature"] as string,
        }

        const wh = new Webhook(CLERK_WEBHOOK_SECRET!);
        const evt = wh.verify(payload, headers) as WebhookEvent;

        if (evt.type === "user.created") {
            const user = evt.data;
            console.log("New user created:", user.id);
        }

        res.status(200)

    } catch (error) {
        console.error("❌ Webhook verification failed:", error);
        res.status(400).json({ error: "Invalid signature" });
    }
};
