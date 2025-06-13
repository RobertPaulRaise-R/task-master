import axios from "axios"; // Assuming you're using Axios for HTTP requests
import { Task } from "../../types"; // Adjust the path if needed

// Replace with your actual API base URL
const API_BASE_URL = "http://localhost:3000/api"; // Example

// This function takes the task ID and the new status as arguments
export const updateTaskStatus = async (
  taskId: string,
  status: Task["status"],
): Promise<Task> => {
  try {
    // Make a PUT or PATCH request to your backend API endpoint
    const response = await axios.patch(
      `${API_BASE_URL}/tasks/${taskId}`,
      { status },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          // Include any necessary authentication headers (e.g., Authorization: Bearer token)
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.error("Error updating task status:", error.message);
    throw error;
  }
};
