import { useDraggable } from "@dnd-kit/core";
import Priority from "./Priority";
import { Task } from "../../types";

function TaskCard({
  task,
  // onDrop is no longer directly used here for drag-and-drop
  onClick, // Renamed prop to better reflect click functionality
}: {
  task: Task;
  onClick?: (task: Task) => void; // Optional: Handle clicks for editing
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id, // Use a stable and unique ID for the task
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
      className={`mb-2 flex cursor-grab flex-col gap-2 rounded border p-3`}
      onClick={() => onClick?.(task)} // Call onClick handler if provided
    >
      <h3 className="text-light-900 line-clamp-1 font-medium hover:line-clamp-none">
        {task.title}
      </h3>
      <p className="text-light-800 line-clamp-2 text-sm">
        {task.description || "No description"}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-light-700 text-xs">
          Due:{" "}
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
        </span>
        <Priority priority={task.priority} />
      </div>
    </div>
  );
}

export default TaskCard;
