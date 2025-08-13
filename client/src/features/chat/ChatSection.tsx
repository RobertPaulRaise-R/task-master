import { HiEllipsisHorizontal } from "react-icons/hi2";
import DropdownMenu from "../../ui/DropdownMenu";
import IconButton from "../../ui/IconButton";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";
import ChatMessage from "./ChatMessage";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useMutation } from "@tanstack/react-query";
import { ChatI, MessageI } from "../../types";

function ChatSection() {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<MessageI[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const chatId = "asd97saa967asd55";

    useEffect(() => {
        const newSocket = io("http://localhost:3000", { withCredentials: true });
        setSocket(newSocket);

        newSocket.emit("joinRoom", chatId);

        newSocket.on("message", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            newSocket.emit("leaveRoom", chatId);
            newSocket.disconnect();
        };
    }, [chatId]);

    const sendMessageMutation = useMutation<
        ChatI,
        Error,
        { chatId: string; content: string; senderId: string }
    >({
        mutationFn: async ({ chatId, content, senderId }) => {
            const response = await fetch("http://localhost:3000/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ chatId, content, senderId }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            setMessage("");
        },
        onError: (error) => {
            console.error("Error sending message:", error);
        },
    });

    const handleSendMessage = () => {
        if (message.trim() && socket) {
            sendMessageMutation.mutate({
                chatId,
                content: message,
                senderId: "Brock Lesnar",
            });
        }
    };

    const chatOptions = [
        {
            label: "Profile",
            icon: <MdModeEdit />,
            onClick: () => console.log("Deleting project"),
        },
        {
            label: "Close",
            icon: <MdDelete />,
            onClick: () => console.log("Deleting project"),
        },
    ];

    return (
        <div className="border-light-300 col-span-full flex flex-col rounded-xl border shadow-md md:col-span-5">
            <div className="flex h-16 w-full items-center justify-between rounded-tl-xl rounded-tr-xl bg-amber-300 px-4">
                <div className="flex items-center">
                    <div className="size-10 rounded-full bg-amber-50"></div>
                    <div className="ml-2 flex flex-col">
                        <span className="">Robert Paul Raise</span>
                        <span className="text-sm">Last seen 2hrs ago</span>
                    </div>
                </div>

                <DropdownMenu
                    items={chatOptions}
                    triggerElement={
                        <IconButton>
                            <HiEllipsisHorizontal />
                        </IconButton>
                    }
                />
            </div>

            {/* MESSAGES */}
            <div className="m-2 flex h-[440px] flex-col gap-1.5 overflow-y-auto">
                {messages.map((chat) => (
                    <ChatMessage chat={chat} />
                ))}
            </div>

            <div className="mb-2 flex w-full items-center gap-2 px-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-light-500 h-10 w-full rounded-4xl border px-6 outline-none"
                />
                <IconButton
                    onClick={handleSendMessage}
                    disabled={sendMessageMutation.isPending}
                >
                    <BiSolidSend size={24} />
                </IconButton>
            </div>
        </div>
    );
}

export default ChatSection;
