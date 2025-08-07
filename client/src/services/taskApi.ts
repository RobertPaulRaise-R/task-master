import axios from "axios";
import { TASKS_API_URL } from "../constants";

export const getTasks = async () => {
    const res = await axios.get(TASKS_API_URL, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    });

    return res.data;
}

export const createTask = async (data: {
    name: string;
    description: string;
    assignedTo?: string;
    priority: "Low" | "Medium" | "High";
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
