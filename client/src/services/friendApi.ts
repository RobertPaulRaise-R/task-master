import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/friends";

export const getFriends = async () => {
  const res = await axios.get(API_BASE_URL, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  return res.data;
};

export const sendFriendRequest = async (userId: string | undefined) => {
  const res = await axios.post(
    `${API_BASE_URL}/request/${userId}`,
    {},
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  );

  return res.data;
};

export const getFriendRequests = async () => {
  const res = await axios.get(`${API_BASE_URL}/requests/`, {
    withCredentials: true,
  });

  return res.data;
};

export const acceptFriendRequests = async (friendId: string | undefined) => {
  const res = await axios.put(
    `${API_BASE_URL}/accept/${friendId}`,
    {},
    { headers: { "Content-Type": "application/json" }, withCredentials: true },
  );

  return res.data;
};
