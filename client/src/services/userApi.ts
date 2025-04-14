export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return res.json();
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }

  return res.json();
};

export const auth = async () => {
  const res = await fetch("http://localhost:3000/api/users/auth", {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");

  return res.json();
};
