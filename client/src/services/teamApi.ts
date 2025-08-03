import axios from "axios";

const API_BASE_URL = `${import.meta.env.BASE_URL}/api/teams/`;

export const createTeam = async (data: {
  name: string;
  project: string | undefined;
}) => {
  if (!data.name || !data.project) {
    throw new Error("Need project name");
  }

  console.log(data);
  try {
    const res = await axios.post(API_BASE_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Axios request failed:", error.response || error.message);
    throw error;
  }
};
