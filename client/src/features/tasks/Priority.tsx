function Priority({ priority }: { priority: "high" | "medium" | "low" }) {
    const color =
        priority === "high"
            ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100"
            : priority === "medium"
                ? "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100"
                : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100";

    return (
        <span className={`rounded-lg px-3 inline-flex items-center justify-center text-sm font-medium ${color}`}>
            {priority}
        </span>
    );
}

export default Priority;
