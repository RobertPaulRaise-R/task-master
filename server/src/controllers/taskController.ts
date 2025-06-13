import { Request, Response } from "express";
import { Task } from "../models/Task.js";

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find();
  if (!tasks) {
    res.status(500).json({ message: "There is no tasks" });
    return;
  }
  res.status(200).json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const task = new Task(req.body);
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
