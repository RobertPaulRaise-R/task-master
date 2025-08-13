import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getTasks } from "../../api/services/taskApi";

export function useTasks() {
    const workspace = useSelector((state: RootState) => state.workspace);

    const {
        isPending,
        error,
        isError,
        data: tasks,
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: () => getTasks(workspace._id),
    });

    return { isPending, error, isError, tasks };
}
