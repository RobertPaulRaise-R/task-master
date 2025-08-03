import { Response, Request } from "express";
import { Team } from "../models/Team.js";
import { IProject, Project } from "../models/Project.js";
import mongoose, { ObjectId } from "mongoose";

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

        const { name, project: projectId } = req.body;
        if (!name || !projectId) {
            return res
                .status(400)
                .json({ message: "Team name and project are required." });
        }

        const team = await Team.create({
            createdBy: userId,
            name,
            project: projectId,
        });

        const projectToUpdate: IProject | null = await Project.findById(
            projectId
        );

        if (!projectToUpdate) {
            await Team.findByIdAndDelete(team._id);
            return res
                .status(404)
                .json({ message: "Associated project not found." });
        }

        projectToUpdate.teams!.push(team._id as mongoose.Types.ObjectId);
        await projectToUpdate.save();

        res.status(201).json({ team });
    } catch (error) {
        console.log(error, "Team creation failed");
    }
};
