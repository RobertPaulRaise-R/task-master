import { useDrag } from "react-dnd";

export const ItemTypes = {
  TASK: "task",
};

export interface TaskType {
  id: string;
  title: string;
  status: "To Do" | "In Progress" | "In Review" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: Date;
  projectId: string;
  userId: string;
}

function TaskCard({
  task,
  onDrop,
}: {
  task: object;
  onDrop: (task: object) => void;
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
      className={`bg-brand-50 mb-2 cursor-move rounded border p-3 ${
        isDragging ? "opacity-50" : ""
      }`}
      onClick={() => onDrop(task)} // Optional: Handle clicks for editing
    >
      <h3 className="text-brand-900 font-medium">{task.title}</h3>
      <p className="text-brand-600 text-sm">
        {task.description || "No description"}
      </p>
      <span className="text-brand-700 text-xs">
        Due:{" "}
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
      </span>
    </div>
  );
}

export default TaskCard;
