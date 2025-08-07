import { Request, Response } from "express";
import { Task } from "../models/Task.js";
import { Project } from "../models/Project.js";
import { Team } from "../models/Team.js";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    console.log(userId);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized or invalid user id' });
    }

    const directTasks = await Task.find({ userId }).lean();

    const projects = await Project.find({ members: userId }).select('_id').lean();
    const projectIds = projects.map((project) => project._id);
    const projectTasks = await Task.find({ projectId: { $in: projectIds } }).lean();

    const teams = await Team.find({ members: userId }).select('_id').lean();
    const teamIds = teams.map((team) => team._id);
    const teamTasks = await Task.find({ teamId: { $in: teamIds } }).lean();

    const allTasks = [...directTasks, ...projectTasks, ...teamTasks];
    const uniqueTasks = Array.from(
      new Map(allTasks.map((task) => [task._id.toString(), task])).values()
    );

    if (uniqueTasks.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(uniqueTasks);
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
        return res.status(401).json({ message: "Need name, description, priority, dueDate, projectId, workspaceId "});
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
