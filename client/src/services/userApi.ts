import axios from "axios";
import { USERS_API_URL } from "../constants";

export const getUser = async () => {
    const res = await axios.get(`${USERS_API_URL}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });

    return res.data;
}

export const createUser = async (data: {
    name: string;
    username: string;
    email: string;
    password: string;
}) => {
    const res = await axios.post(`${USERS_API_URL}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });

    return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
    console.log("loginUser API HIT");
    const res = await axios.post(`${USERS_API_URL}/login`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });

    return res.data;
};

export const auth = async () => {
    const res = await axios.get(`${USERS_API_URL}/auth`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    });

    return res.data;
};

export const logoutUser = async () => {
    const res = await axios.post(
        `${USERS_API_URL}/logout`,
        {},
        {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        },
    );
    return res.data;
};

export const getUserForFriendRequest = async (email: string) => {
    const res = await axios.get(
        `${USERS_API_URL}/request/?query=${encodeURIComponent(email)}`,
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        },
    );

    return res.data;
};

export const uploadUserProfile = async (data: File) => {
    const res = await axios.post(`${USERS_API_URL}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });

    return res.data;
}
