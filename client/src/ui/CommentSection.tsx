import { useComments } from "../api/queries/useComments";
import { CommentI } from "../types";
import Comment from "./Comment";
import CommentBox from "./CommentBox";

function CommentSection({ taskId }: { taskId: string }) {
    const { comments, isError, isPending } = useComments(taskId);

    console.log(comments);

    return (
        <div className="p-4">
            <CommentBox taskId={taskId} />

            <div className="flex flex-col gap-2 mt-4">
                {
                    !isPending && !isError && comments && comments.length > 0 &&
                    comments.map((comment: CommentI) => (
                        <Comment key={comment._id} comment={comment} />
                    ))
                }
            </div>
        </div>
    );
}

export default CommentSection;
