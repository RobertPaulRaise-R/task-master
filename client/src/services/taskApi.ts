export const createTask = async (data: {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  dueDate: Date;
}) => {
  const res = await fetch("http://localhost:3000/api/tasks/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  console.log(res);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }

  return res.json();
};
