function Status({ status }: { status: "todo" | "in_progress" | "done" | "active" | "completed" | "on_hold" | "cancelled" }) {

    const active = status === "todo" || "active";
    const completed = status === "done" || "completed";
    const on_hold = status === "in_progress" || "on_hold";

    const bgColor = active ? "bg-blue-100 dark:bg-blue-900" :
        on_hold ? "bg-amber-100 dark:bg-amber-900" :
            completed ? "bg-green-100 dark:bg-green-900" :
                status === "cancelled" ? "bg-red-100 dark:bg-red-900" : "";

    const textColor = active ? "text-blue-800 dark:text-blue-100" :
        on_hold ? "text-amber-800 dark:text-amber-100" :
            completed ? "text-green-800 dark:text-green-100" :
                status === "cancelled" ? "text-red-800 dark:text-red-100" : "";

    return (
        <div className={`px-3 rounded-lg inline-flex items-center justify-center text-sm ${bgColor} ${textColor}`}>
            <span className="inline-block">{status}</span>
        </div>
    );
}

export default Status;
