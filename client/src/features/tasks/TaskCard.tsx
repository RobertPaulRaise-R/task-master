import { useDrag } from "react-dnd";
import { Task } from "../../pages/Tasks";
import Priority from "./Priority";

export const ItemTypes = {
  TASK: "task",
};

function TaskCard({
  task,
  onDrop,
}: {
  task: Task;
  onDrop: (task: Task) => void;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`mb-2 flex cursor-move flex-col gap-2 rounded border p-3 ${
        isDragging ? "opacity-50" : ""
      }`}
      onClick={() => onDrop(task)} // Optional: Handle clicks for editing
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
