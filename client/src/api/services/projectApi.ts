import axios from "axios";
import { PROJECTS_API_URL } from "../../constants";

export const getProjects = async (workspaceId: string) => {
    const res = await axios.get(`${PROJECTS_API_URL}?workspaceId=${workspaceId}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });

    return res.data;
}

export const createProject = async (data: {
    name: string;
    description: string;
    workspaceId: string;
}) => {
    const res = await axios.post(PROJECTS_API_URL, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });

    return res.data;
};

export const getProjectById = async (projectId: string | undefined) => {
    if (!projectId) {
        throw new Error("Project id is required");
    }

    const res = await axios.get(`${PROJECTS_API_URL}/${projectId}`, {
        withCredentials: true,
    });

    return res.data;
};

export const deleteProjectById = async (projectId: string) => {
    const res = await axios.delete(`${PROJECTS_API_URL}/${projectId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });

    return res.data;
};
