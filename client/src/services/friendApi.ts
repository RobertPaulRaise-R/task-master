import axios from "axios";
import { FRIENDS_API_URL } from "../constants";


export const getFriends = async () => {
    const res = await axios.get(FRIENDS_API_URL, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });

    return res.data;
};

export const sendFriendRequest = async (userId: string | undefined) => {
    const res = await axios.post(
        `${FRIENDS_API_URL}/request/${userId}`,
        {},
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        },
    );

    return res.data;
};

export const getFriendRequests = async () => {
    const res = await axios.get(`${FRIENDS_API_URL}/requests/`, {
        withCredentials: true,
    });

    return res.data;
};

export const acceptFriendRequests = async (friendId: string | undefined) => {
    const res = await axios.put(
        `${FRIENDS_API_URL}/accept/${friendId}`,
        {},
        { headers: { "Content-Type": "application/json" }, withCredentials: true },
    );

    return res.data;
};
