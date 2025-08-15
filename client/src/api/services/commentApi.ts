import axios from "axios"
import { COMMENTS_API_URL } from "../../constants";

export const getCommentsByTask = async (taskId: string) => {
    const res = await axios.get(`${COMMENTS_API_URL}/?taskId=${taskId}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });

    return res.data;
}
