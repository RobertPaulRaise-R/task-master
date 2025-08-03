import axios from "axios";

const API_BASE_URL = `${import.meta.env.BACKEND_BASE_URL}/api/projects`; 

export const createProject = async (data: {
  name: string;
  description: string;
}) => {
  const res = await axios.post(API_BASE_URL, data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  return res.data;
};

export const getProjectById = async (projectId: string | undefined) => {
  if (!projectId) {
    throw new Error("Project id is required");
  }

  const res = await axios.get(`${API_BASE_URL}/${projectId}`, {
    withCredentials: true,
  });

  return res.data;
};

export const deleteProjectById = async (projectId: string) => {
  const res = await axios.delete(`${API_BASE_URL}/${projectId}`, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  return res.data;
};
