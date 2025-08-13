import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router";
import { getTaskById } from "../services/taskApi";

export const useTaskById = () => {
    const { id: taskId } = useParams<{ id: string }>();
    const { data: task, isPending, isError, error } = useQuery({
        queryKey: [taskId],
        queryFn: () => getTaskById(taskId),
    });

    return { task, isPending, isError, error };
}
