export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "In Review" | "Done";
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  projectId: string;
  userId: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
