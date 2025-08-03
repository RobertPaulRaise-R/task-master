import axios from "axios";

const API_BASE_URL = `${import.meta.env.BASE_URL}/api/tasks/`;

export const createTask = async (data: {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  dueDate: Date;
}) => {
  const res = await axios.post(API_BASE_URL, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
  });

  console.log(res);

  return res.data;
};
