export const BACKEND_API_URL    = import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_BACKEND_BASE_URL : import.meta.env.VITE_BACKEND_LOCAL_URL;
export const FRIENDS_API_URL    = `${BACKEND_API_URL}/friends`;
export const TASKS_API_URL      = `${BACKEND_API_URL}/tasks`;
export const PROJECTS_API_URL   = `${BACKEND_API_URL}/projects`;
export const TEAMS_API_URL       = `${BACKEND_API_URL}/teams`;
export const USERS_API_URL       = `${BACKEND_API_URL}/users`;
export const WORKSPACES_API_URL  = `${BACKEND_API_URL}/workspaces`;
