import { useDraggable } from "@dnd-kit/core";
import Priority from "./Priority";
import { TaskI } from "../../types";
import { Link, useNavigate } from "react-router";
import IconButton from "../../ui/IconButton";
import DropdownMenu from "../../ui/DropdownMenu";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskById } from "../../api/services/taskApi";

function TaskCard({
    task,
    onClick,
    cursorType
}: {
    task: TaskI;
    onClick?: (task: TaskI) => void;
    cursorType?: "pointer" | "grab";
}) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const cursorStyle = cursorType === "grab" ? "cursor-grab" : "cursor-pointer";

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined;

    const deleteTaskMutation = useMutation({
        mutationFn: deleteTaskById,
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"] as InvalidateQueryFilters); 
        },
    });

    const taskOptions = [
        {
            label: "Edit",
            icon: <MdModeEdit />,
            onClick: () => navigate(`/app/tasks/${task._id}`),
        },
        {
            label: "Delete",
            icon: <MdDelete />,
            onClick: () => deleteTaskMutation.mutate(task._id),
        },
    ];


    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`mb-2 flex cursor-grab flex-col gap-2 rounded border dark:bg-neutral-800 dark:border-neutral-700 p-3 ${cursorStyle}`}
            onClick={() => onClick?.(task)}
        >
            <div className="flex items-center justify-between">
                <Link to={`/app/tasks/${task._id}`} className="text-light-900 dark:text-white line-clamp-1 font-medium">
                    {task.name}
                </Link>

                <DropdownMenu
                    items={taskOptions}
                    triggerElement={
                        <IconButton>
                            <SlOptionsVertical size={14}/>
                        </IconButton>
                    } />
            </div>
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
