function Status({ status }: { status: "active" | "completed" | "on_hold" | "cancelled" }) {
    const bgColor = status === "active" ? "bg-blue-200" :
                    status === "completed" ? "bg-green-500" :
                    status === "on_hold" ? "bg-amber-500" :
                    status === "cancelled" ? "bg-red-500" : "";

    return (
        <div className={`text-light-800 dark:text-neutral-950 px-2 py-1 rounded-full flex items-center justify-center gap-1 ${bgColor}`}>
            <span className="inline-block">{status}</span>
            <span className="inline-block size-2 bg-neutral-950 rounded-full"></span>
        </div>
    );
}

export default Status;
