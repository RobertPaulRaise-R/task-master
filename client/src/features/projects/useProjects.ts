import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../services/projectApi";

export function useProjects() {
  const {
    isPending,
    error,
    isError,
    data: projects,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects
  });

  return { isPending, error, isError, projects };
}
