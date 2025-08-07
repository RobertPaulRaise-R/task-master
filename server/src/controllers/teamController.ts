import { Response, Request } from "express";
import { Team } from "../models/Team.js";

export const createTeam = async (req: Request, res: Response) => {
    try {
        const userId = (req as Request).user?._id;

        console.log("Create Team API HIT");
        if (!userId) {
            console.error(
                "Error: userId is undefined. Auth middleware might not have run or failed."
            );
            return res
                .status(401)
                .json({ message: "Not authorized. User ID missing." });
        }

        const { name, workspaceId } = req.body;
        if (!name || !workspaceId) {
            return res
                .status(400)
                .json({ message: "Team name and workspaceId are required." });
        }

        const team = await Team.create({
            createdBy: userId,
            name,
            workspaceId,
        });

        res.status(201).json({ team });
    } catch (error) {
        console.log(error, "Team creation failed");
    }
};
