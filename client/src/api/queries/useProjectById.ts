import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getProjectById } from "../services/projectApi";

export function useProjectById() {
    const { id: projectId } = useParams<{ id: string }>();

    const {
        isPending,
        error,
        isError,
        data: project,
    } = useQuery({
        queryKey: [projectId],
        queryFn: () => getProjectById(projectId),
    });

    return { isPending, error, isError, project };
}
