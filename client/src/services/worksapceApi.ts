import axios from "axios"

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/workspaces`;

export const getWorkspaces = async () => {
    const res = await axios.get(API_BASE_URL, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    })

    return res.data;
}
