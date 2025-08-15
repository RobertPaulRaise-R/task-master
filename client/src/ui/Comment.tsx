import LinesEllipsis from "react-lines-ellipsis"
import { useState } from "react";
import { CommentI } from "../types";
import { getDate } from "../utils/getDate";
import { Link } from "react-router";

function Comment({ comment }: { comment: CommentI }) {
    const [showMore, setShowMore] = useState(false);

    const date = getDate(comment.createdAt);

    return (
        <div className="flex items-start gap-2 p-2">
            <div className="h-10 w-10 p-4 bg-light-200 dark:bg-neutral-800 text-light-800 dark:text-neutral-400 rounded-full inline-flex items-center justify-center">
                {comment.createdBy.name[0]}
            </div>

            <div>
                <div className="flex items-end gap-3">
                    <Link to={`/app/users/${comment.createdBy._id}`} className="font-medium">{comment.createdBy.name}</Link>
                    <p className="text-sm">{date}</p>
                </div>
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
                            "show more"
                        }
                        trimRight
                        basedOn="words"
                        onClick={() => setShowMore(true)}
                    />
                )}
            </div>
        </div>
    );
}

export default Comment;
