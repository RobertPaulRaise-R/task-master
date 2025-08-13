import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../tasks/TaskCard";
import { TaskI } from "../../types";

function KanbanColumn({
    status,
    tasks,
}: {
    status: "todo" | "in_progress" | "done"; 
    tasks: TaskI[];
}) {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    });

    const filteredTasks: TaskI[] = tasks.filter((task) => task.status === status);

    return (
        <div
            ref={setNodeRef}
            className={`border-light-300 dark:border-neutral-700 min-h-screen flex-1 rounded-lg border ${isOver ? "bg-brand-200 dark:bg-neutral-900" : ""
                }`}
        >
            <h2 className="text-brand-900 dark:text-brand-400 bg-brand-100 dark:bg-neutral-900 mb-4 p-2 font-bold">
                {status}
            </h2>
            <div className="px-2">
                {filteredTasks.map((task: TaskI) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        cursorType="grab"
                    />
                ))}
            </div>
        </div>
    );
}

export default KanbanColumn;
