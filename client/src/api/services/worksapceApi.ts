import axios from "axios"
import { WORKSPACES_API_URL } from "../../constants";

export const getWorkspaces = async () => {
    const res = await axios.get(WORKSPACES_API_URL, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    })

    return res.data;
}

export const createWorkspace = async (data: {
    name: string;
    description: string;
    visibility: string;
}) => {
    const res = await axios.post(WORKSPACES_API_URL, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    });

    return res.data;
}
