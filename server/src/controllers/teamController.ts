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

export const getTeams = async (req: Request, res: Response) => {
    try {
        const { workspaceId } = req.query;

        if (!workspaceId) {
            return res.status(400).json({ message: "workspaceId is required for fetching teams" });
        }

        const teams = await Team.find({ workspaceId: workspaceId });

        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json( { message: "Error fetching getTeams" });
    }
}

export const getTeamById = async (req: Request, res: Response) => {
    try {
        const { teamId } = req.query;

        if (!teamId) {
            return res.status(400).json({ message: "teamId is required for fetching team" });
        }

        const team = await Team.findById(teamId).populate("members", "name email");

        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: "Error fetching getTeamById" });
    }
}
