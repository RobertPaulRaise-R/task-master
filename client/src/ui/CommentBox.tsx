import IconButton from "./IconButton";
import { LuSendHorizontal } from "react-icons/lu";
import { useCreateCommentMutation } from "../api/mutations/useCreateCommentMutation";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function CommentBox({ taskId }: { taskId: string }) {
    const { mutate } = useCreateCommentMutation();

    const workspace = useSelector((state: RootState) => state.workspace);

    const { register, handleSubmit } = useForm<{
        content: string;
    }>();

    const onSubmit = (data: { content: string }) => {
        mutate({ taskId, workspaceId: workspace._id, ...data });
    }

    return (
        <div className="flex items-center gap-2">
            <textarea
                rows={1}
                placeholder="Add comment"
                className="outline-none border-b p-2 w-full"
                {...register("content", { required: true })}
            />

            <IconButton onClick={handleSubmit(onSubmit)}>
                <LuSendHorizontal size={20} />
            </IconButton>
        </div>
    );
}


export default CommentBox;
