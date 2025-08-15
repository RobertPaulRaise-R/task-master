import { useMutation } from "@tanstack/react-query";
import { createComment } from "../services/commentApi";
import toast from "react-hot-toast";

export const useCreateCommentMutation = () => {

    return useMutation({
        mutationFn: createComment,
        onSuccess: () => {
            toast.success("Comment Added");
        },
        onError: () => {
            toast.error("Something went wrong");
        },
    });
};
