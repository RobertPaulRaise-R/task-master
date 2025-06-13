import { useQuery } from "@tanstack/react-query";

export function useProjects() {
  const {
    isPending,
    error,
    isError,
    data: projects,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      fetch("http://localhost:3000/api/projects/", {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return { isPending, error, isError, projects };
}
