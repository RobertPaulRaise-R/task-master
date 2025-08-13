import { MessageI } from "../../types";

function ChatMessage({ chat } : { chat: MessageI}) {
    const alignmentClass =
        chat.senderId === "Robert Paul Raise" ? "justify-end" : "justify-start";

    return (
        <div className={`flex ${alignmentClass} w-full`}>
            <span className={`bg-brand-50 max-w-80 rounded-md p-2`}>
                {" "}
                {/* Added padding and rounding for better UI */}
                {chat.content}
            </span>
        </div>
    );
}

export default ChatMessage;
