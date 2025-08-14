import axios from "axios";
import { TASKS_API_URL } from "../../constants";
import { TaskI } from "../../types";

export const getTasks = async (workspaceId: string) => {
    const res = await axios.get(`${TASKS_API_URL}/?workspaceId=${workspaceId}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    });

    return res.data;
}

export const getTasksByProject = async (projectId: string) => {
    const res = await axios.get(`${TASKS_API_URL}/project/?projectId=${projectId}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    });

    return res.data;
}

export const getTaskById = async (taskId: string | undefined) => {
    const res = await axios.get(`${TASKS_API_URL}/${taskId}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });

    console.log(res.data);

    return res.data;
}

export const createTask = async (data: {
    name: string;
    description: string;
    assignedTo?: string;
    priority: "low" | "medium" | "high";
    dueDate: Date;
    projectId: string | undefined;
    workspaceId: string;
}) => {
    const res = await axios.post(TASKS_API_URL, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });

    console.log(res);

    return res.data;
};

export const updateTask = async (data: {
    _id: string;
    name?: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: string;
    assignedTo?: string;
}) => {
    const res = await axios.put(`${TASKS_API_URL}/${data._id}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });

    return res.data;
};

export const deleteTaskById = async (taskId: string) => {
    const res = await axios.delete(`${TASKS_API_URL}/${taskId}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });

    return res.data;
};
