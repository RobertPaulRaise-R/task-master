export interface TaskI {
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

export interface ChatI {
  _id: string;
  name?: string;
  participants: string[];
  type: "direct" | "group" | "team";
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectI {
  _id: string;
  name?: string;
  description: string;
  teams: TeamI[];
  tasks: TaskI[];
  members: { name: string; avatar: string; email: string }[];
  createdBy: { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

export interface TeamI {
  _id: string;
  createdAt: string;
  createdBy: string;
  members: [];
  name: string;
  project: string;
  tasks: [];
  updatedAt: string;
}

export interface UserI {
  _id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  position: string;
  settings?: {
    theme: "light" | "dark";
    notifications: boolean;
  };
  createdAt: string;
  updatedAt: string;
}
