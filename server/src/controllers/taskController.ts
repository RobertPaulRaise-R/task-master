import { Request, Response } from "express";
import { Task } from "../models/Task.js";

export const getTaskById = async (req: Request, res: Response) => {
    const taskId = req.params.id;

    console.log("getTaskById API HIT");

    if (!taskId) {
        return res.status(401).json({ message: 'Requires taskId' });
    }

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            res.status(400).json({ message: "There is no task with the given id" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching getTaskById' });
    }
}

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
            .select('name description status priority dueDate createdAt')
            .sort({ createdAt: -1 });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching getUserNotDoneTasks' });
    }
}

export const getTasksByProject = async (req: Request, res: Response) => {
    const { projectId } = req.query;

    console.log("getTasksByProject API HIT");

    console.log("projectId", projectId);

    if (!projectId) {
        return res.status(401).json({ message: 'Requires projectId' });
    }

    try {
        const tasks = await Task.find({
            projectId: projectId
        })
            .populate('projectId', 'name')
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name email')
            .select('name description status priority dueDate createdAt')
            .sort({ createdAt: -1 });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching getTasksByProject', error: error });
    }
};

export const createTask = async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized or invalid user ID' });
    }

    const { name, description, priority, assignedTo, dueDate, projectId, workspaceId } = req.body;

    if (!name || !description || !priority || !dueDate || !projectId || !workspaceId) {
        return res.status(401).json({ message: "Need name, description, priority, dueDate, projectId, workspaceId " });
    }

    const task = new Task({
        name,
        description,
        priority,
        dueDate,
        assignedTo,
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
