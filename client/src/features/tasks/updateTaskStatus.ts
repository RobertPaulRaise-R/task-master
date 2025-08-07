import axios from "axios";
import { TaskI } from "../../types";

const API_BASE_URL = `${import.meta.env.BACKEND_BASE_URL}/api`;

export const updateTaskStatus = async (
    taskId: string,
    status: TaskI["status"],
): Promise<TaskI> => {
    const response = await axios.patch(
        `${API_BASE_URL}/tasks/${taskId}`,
        { status },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    return response.data;
};
