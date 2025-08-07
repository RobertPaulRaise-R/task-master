import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../services/taskApi";

export function useTasks() {
    const {
        isPending,
        error,
        isError,
        data: tasks,
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });

    return { isPending, error, isError, tasks };
}
