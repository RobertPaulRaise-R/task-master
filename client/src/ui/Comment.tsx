import LinesEllipsis from "react-lines-ellipsis"
import { useState } from "react";
import { CommentI } from "../types";

function Comment({ comment }: { comment: CommentI }) {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="flex items-start gap-2">
            <div className="h-10 w-10 p-4 bg-light-200 text-light-800 rounded-full inline-flex items-center justify-center">
                {comment.createdBy.name[0]}
            </div>

            <div>
                <div>{comment.createdBy.name}</div>
                {showMore ? (
                    <p>
                        {comment.content}
                        <span
                            className="text-blue-500 cursor-pointer hover:underline ml-1"
                            onClick={() => setShowMore(false)}
                        >
                            show less
                        </span>
                    </p>
                ) : (
                    <LinesEllipsis
                        text={comment.content}
                        maxLine="2"
                        ellipsis={
                            <span
                                className="text-blue-500 cursor-pointer hover:underline ml-1"
                                onClick={() => setShowMore(true)}
                            >
                                show less
                            </span>
                        }
                        trimRight
                        basedOn="letters"
                        onClick={() => setShowMore(true)}
                    />
                )}
            </div>
        </div>
    );
}

export default Comment;
