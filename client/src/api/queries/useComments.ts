import { useQuery } from "@tanstack/react-query"
import { getCommentsByTask } from "../services/commentApi";

export const useComments = (taskId: string) => {
    const { data: comments, isPending, isError } = useQuery({
        queryKey: [`C${taskId}`],
        queryFn: () => getCommentsByTask(taskId),
    });

    return { comments, isPending, isError };
}
