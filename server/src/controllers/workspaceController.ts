import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Workspace } from '../models/Workspace.js';


export const createWorkspace = async (req: Request, res: Response) => {
  try {
    const { name, description, visibility } = req.body;
    const userId = req.user?._id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ message: 'Unauthorized or invalid user ID' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Workspace name is required' });
    }

    const workspace = new Workspace({
      name,
      description: description || null,
      visibility: visibility || 'private',
      members: [{ user: userId, role: 'admin' }], // Creator is admin
      createdBy: userId,
      projects: [],
      teams: [],
      settings: {
        theme: 'light',
        notifications: true,
      },
    });

    await workspace.save();
    res.status(201).json(workspace);
  } catch (error) {
    console.error('Error creating workspace:', error);
    res.status(500).json({ message: 'Server error while creating workspace' });
  }
};

export const getWorkspaces = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ message: 'Unauthorized or invalid user ID' });
    }

    const workspaces = await Workspace.find({ 'members.user': userId })
      .populate('createdBy', 'name email')
      .populate('projects', 'name status')
      .populate('teams', 'name')
      .lean();

    if (workspaces.length === 0) {
      return res.status(404).json({ message: 'No workspaces found for this user' });
    }

    res.status(200).json(workspaces);
  } catch (error) {
    console.error('Error fetching workspaces:', error);
    res.status(500).json({ message: 'Server error while fetching workspaces' });
  }
};
