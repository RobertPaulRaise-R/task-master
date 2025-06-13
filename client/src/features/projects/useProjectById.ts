import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../services/projectApi";
import { useParams } from "react-router";

export function useProjectById() {
  const { id } = useParams<{ id: string }>();

  const {
    isPending,
    error,
    isError,
    data: project,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjectById(id),
  });

  return { isPending, error, isError, project };
}
