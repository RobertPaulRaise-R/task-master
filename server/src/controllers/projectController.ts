import { Request, Response } from "express";
import { Project } from "../models/Project.js";
import { Team } from "../models/Team.js";
import mongoose from "mongoose";
import { Task } from "../models/Task.js";
import { Workspace } from "../models/Workspace.js";

export const getProjects = async (req: Request, res: Response) => {
    try {
        const { workspaceId } = req.query;
        
        console.log("workspaceId", workspaceId);

        if (!workspaceId) {
            return res.status(400).json({ message: "Missing required parameter workspaceId" });
        }

        const workspace = await Workspace.findById(workspaceId);

        const projects = workspace?.projects;

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the projects.",
        });
    }
}

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res
                .status(400)
                .json({ message: "Invalid project ID format" });
        }

        const project = await Project.findById(id)
            .populate({
                path: "teams",
                model: Team,
                populate: {
                    path: "members",
                    model: "User",
                    select: "name avatar",
                },
            })
            .populate({
                path: "members",
                model: "User",
                select: "name avatar email",
            })
            .populate({
                path: "tasks",
                model: Task,
                populate: {
                    path: "userId",
                    model: "User",
                },
            });

        if (!project) {
            res.status(404).json({ message: "The Project is not available" });
            return;
        }

        res.status(200).json(project);
    } catch (err) {
        console.error("Error fetching project by ID:", err);

        res.status(500).json({
            message: "An error occurred while fetching the project.",
        });
    }
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        const { name, description, workspaceId } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID not found. Authentication required.",
            });
        }
        if (!name || !description || !workspaceId) {
            return res
                .status(400)
                .json({ message: "Project name, description, workspaceId is required." });
        }

        const project = await Project.create({
            name,
            description,
            startDate: Date.now(),
            workspaceId,
            createdBy: userId,
        });

        res.status(200).json(project);
    } catch (error) {
        console.error(
            "Error creating project or assigning manager team:",
            error
        );
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({
            message:
                "Internal server error. Could not create project or manager team.",
        });
    }
};

export const deleteProjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ message: "Invalid project ID format." });
        }

        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found." });
        }

        await Team.deleteMany({ project: id });
        console.log(`Deleted teams associated with project ID: ${id}`);

        await Task.deleteMany({ project: id });
        console.log(`Deleted tasks associated with project ID: ${id}`);

        res.status(200).json({
            message: "Project and associated data deleted successfully.",
        });
    } catch (error) {
        console.error("Error in deleteProjectById:", error); // Use console.error for errors
        res.status(500).json({ message: "Internal server error." });
    }
};
