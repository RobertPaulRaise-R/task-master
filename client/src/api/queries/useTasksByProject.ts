import { useQuery } from "@tanstack/react-query"
import { getTasksByProject } from "../services/taskApi";

export const useTasksByProject = (projectId: string) => {
    const { data: tasks, isError, error, isPending } = useQuery({
        queryKey: [projectId],
        queryFn: () => getTasksByProject(projectId),
        enabled: !!projectId,
    });

    return { isError, error, isPending, tasks };
}
