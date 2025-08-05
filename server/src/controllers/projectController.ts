import { Request, Response } from "express";
import { Project } from "../models/Project.js";
import { Team } from "../models/Team.js";
import mongoose from "mongoose";
import { Task } from "../models/Task.js";

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
                path: "members", // Populate the 'members' field directly in the Project document
                model: "User", // Specify the User model
                select: "name avatar email", // Select specific fields from the User document
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
        const userId: unknown = req.user?._id;
        const { name, description } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID not found. Authentication required.",
            });
        }
        if (!name) {
            return res
                .status(400)
                .json({ message: "Project name is required." });
        }

        const project = await Project.create({
            name,
            description,
            teams: [],
            startDate: Date.now(),
            createdBy: userId,
        });

        const managerTeam = await Team.create({
            name: "Managers",
            members: [userId], // Add the project creator as a member
            project: project._id, // Link this team to the newly created project
            createdBy: userId,
        });

        project.teams!.push(managerTeam._id as mongoose.Types.ObjectId);
        project.members?.push(userId as mongoose.Types.ObjectId);
        project.save();

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

export const getProjectsByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;

        console.log("getProjectsByUser API HIT");

        if (!userId) {
            return res
                .status(400)
                .json({ message: "User ID not found in request." });
        }

        // 1. Find all teams the user is a member of
        const userTeams = await Team.find({ members: userId }).select(
            "project"
        ); // Select only the project ID

        // Extract unique project IDs from the teams
        const projectIds = userTeams.map((team) => team.project);
        const uniqueProjectIds = [
            ...new Set(projectIds.map((id) => id.toString())),
        ].map((id) => new mongoose.Types.ObjectId(id));

        // 2. Find all projects associated with those project IDs
        const projects = await Project.find({
            _id: { $in: uniqueProjectIds },
        }).populate({ path: "createdBy", select: "name" });

        res.status(200).json(projects);
    } catch (error) {
        console.error("Error in getProjectsByUser:", error); // Use console.error for errors
        res.status(500).json({ message: "Internal server error." });
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
