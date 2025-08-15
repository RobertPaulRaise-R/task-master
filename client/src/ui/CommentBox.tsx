import { useState } from "react";
import IconButton from "./IconButton";
import { LuSendHorizontal } from "react-icons/lu";

function CommentBox() {
    const [text, setText] = useState("");

    return (
        <div className="flex items-center gap-2 p-4">
            <textarea
                rows={1}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add comment"
                className="outline-none border-b p-2 w-full"
            />

            <IconButton>
                <LuSendHorizontal size={20}/>
            </IconButton> 
        </div>
    );
}


export default CommentBox;
