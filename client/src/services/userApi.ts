import axios from "axios";
import { data } from "react-router";

const API_BASE_URL = "http://localhost:3000/api/users";

export const getUser = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });

        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "User does not exist");
    }
}

export const createUser = async (data: {
  name: string;
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${API_BASE_URL}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/login`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
    return res.data;
  } catch (error: any) {
    console.log(error.response);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const auth = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/auth`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    throw new Error("Not authenticated");
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/logout`,
      {}, // Empty body for logout
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      },
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const getUserForFriendRequest = async (email: string) => {
  const res = await axios.get(
    `${API_BASE_URL}/request/?query=${encodeURIComponent(email)}`,
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  );

  return res.data;
};

export const uploadUserProfile = async (data: File) => {
    try {
        const res = await axios.post(`${API_BASE_URL}`, data, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });

        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Image Upload failed");
    }
}
