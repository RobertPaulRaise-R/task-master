import { Request, Response } from "express";
import { Task } from "../models/Task.js";
import { Project } from "../models/Project.js";
import { Team } from "../models/Team.js";

export const getUserNotDoneTasks = async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { workspaceId } = req.query;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized or invalid user id' });
    }

    if (!workspaceId) {
        return res.status(401).json({ message: 'Requires workspaceId' });
    }

    try {
        const tasks = await Task.find({
            workspaceId: workspaceId,
            assignedTo: userId,
            status: { $ne: 'done' }
        })
            .populate('projectId', 'name')
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name email')
            .select('title description status priority dueDate createdAt')
            .sort({ createdAt: -1 });

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching user tasks:', error);
        throw error;
    }
}

export const getUserAllTasks = async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { workspaceId } = req.query;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized or invalid user id' });
    }

    if (!workspaceId) {
        return res.status(401).json({ message: 'Requires workspaceId' });
    }

    try {
        const tasks = await Task.find({
            workspaceId: workspaceId,
            assignedTo: userId,
        })
            .populate('projectId', 'name')
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name email')
            .select('name description status priority dueDate createdAt')
            .sort({ createdAt: -1 });

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error while fetching tasks' });
    }
};

export const createTask = async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized or invalid user ID' });
    }

    const { name, description, priority, dueDate, projectId, workspaceId } = req.body;

    if (!name || !description || !priority || !dueDate || !projectId || !workspaceId) {
        return res.status(401).json({ message: "Need name, description, priority, dueDate, projectId, workspaceId " });
    }

    const task = new Task({
        name,
        description,
        priority,
        dueDate,
        projectId,
        userId,
        workspaceId
    });
    const savedTask = await task.save();
    res.status(200).json(savedTask);
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).send();
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
