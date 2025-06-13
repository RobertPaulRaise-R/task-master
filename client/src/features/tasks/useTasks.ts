import { useQuery } from "@tanstack/react-query";

export function useTasks() {
  const {
    isPending,
    error,
    isError,
    data: tasks,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () =>
      fetch("http://localhost:3000/api/tasks").then((res) => res.json()),
  });

  return { isPending, error, isError, tasks };
}
