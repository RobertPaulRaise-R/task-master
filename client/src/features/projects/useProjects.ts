import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../services/projectApi";
import { ProjectI } from "../../types";

interface ProjectsResponse {
    data: ProjectI[];
}

export function useProjects() {
  const {
    isPending,
    error,
    isError,
    data,
  } = useQuery<ProjectsResponse>({
    queryKey: ["projects"],
    queryFn: getProjects
  });

  const projects = data?.data || [];

  return { isPending, error, isError, projects };
}
