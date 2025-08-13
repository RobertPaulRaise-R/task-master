import axios from "axios";
import { TEAMS_API_URL } from "../../constants";

export const createTeam = async (data: {
    name: string;
    workspaceId: string;
}) => {
    if (!data.name || !data.workspaceId) {
        throw new Error("Need project name and workspaceId");
    }

    const res = await axios.post(TEAMS_API_URL, data, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
    return res.data;
};
