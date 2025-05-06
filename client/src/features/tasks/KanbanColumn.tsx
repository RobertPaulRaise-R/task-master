import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../tasks/TaskCard";
import { Task } from "../../types";

function KanbanColumn({
  status,
  tasks,
}: {
  status: "To Do" | "In Progress" | "In Review" | "Done";
  tasks: Task[];
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: status, // Unique ID for the droppable area
  });

  const filteredTasks: Task[] = tasks.filter((task) => task.status === status);

  return (
    <div
      ref={setNodeRef}
      className={`border-light-300 h-screen flex-1 rounded-lg border ${
        isOver ? "bg-brand-200" : ""
      }`}
    >
      <h2 className="text-brand-900 bg-brand-100 mb-4 p-2 font-bold">
        {status}
      </h2>
      <div className="px-2">
        {filteredTasks.map((task: Task) => (
          <TaskCard
            key={task._id}
            task={task}
            // We only need to pass the task ID here; the drop logic happens at the column level
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
