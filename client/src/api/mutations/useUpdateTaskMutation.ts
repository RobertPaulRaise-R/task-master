import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../services/taskApi";
import toast from "react-hot-toast";

export function useUpdateTaskMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTask,
        onSuccess: (data) => {
            queryClient.invalidateQueries([`${data._id}`] as InvalidateQueryFilters);

            toast.success("Task updated");
        },
        onError: () => {
            toast.error("Task update failed");
        }
    });
}
