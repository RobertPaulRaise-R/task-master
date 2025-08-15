import axios from "axios"
import { COMMENTS_API_URL } from "../../constants";

export const createComment = async (data) => {
    const res = await axios.post(`${COMMENTS_API_URL}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    });

    return res.data;
}

export const getCommentsByTask = async (taskId: string) => {
    const res = await axios.get(`${COMMENTS_API_URL}/?taskId=${taskId}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });

    return res.data;
}
