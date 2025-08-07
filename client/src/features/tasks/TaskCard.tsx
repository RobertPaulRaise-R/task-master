import { useDraggable } from "@dnd-kit/core";
import Priority from "./Priority";
import { TaskI } from "../../types";

function TaskCard({
    task,
    onClick,
}: {
    task: TaskI;
    onClick?: (task: TaskI) => void;
}) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`mb-2 flex cursor-grab flex-col gap-2 rounded border dark:bg-neutral-900 dark:border-neutral-700 p-3`}
            onClick={() => onClick?.(task)}
        >
            <h3 className="text-light-900 dark:text-white line-clamp-1 font-medium hover:line-clamp-none">
                {task.title}
            </h3>
            <p className="text-light-800 dark:text-neutral-400 line-clamp-2 text-sm">
                {task.description || "No description"}
            </p>
            <div className="flex items-center justify-between">
                <span className="text-light-700 dark:text-neutral-400 text-xs">
                    Due:{" "}
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
                </span>
                <Priority priority={task.priority} />
            </div>
        </div>
    );
}

export default TaskCard;
