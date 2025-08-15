import { useComments } from "../api/queries/useComments";
import { CommentI } from "../types";
import Comment from "./Comment";
import CommentBox from "./CommentBox";

function CommentSection({ taskId }: { taskId: string }) {
    const { comments, isError, isPending } = useComments(taskId);

    return (
        <div>
            <CommentBox />
            {
                !isPending && !isError && comments && comments.length > 0 &&
                comments.map((comment: CommentI) => (
                    <Comment key={comment._id} comment={comment} />
                ))
            }
        </div>
    );
}

export default CommentSection;
