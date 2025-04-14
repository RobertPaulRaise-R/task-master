import { useDrop } from "react-dnd";
import TaskCard from "../tasks/TaskCard";
import { ItemTypes } from "../tasks/TaskCard";
import { Task } from "../../types";

function KanbanColumn({
  status,
  tasks,
  onDrop,
}: {
  status: "To Do" | "In Progress" | "In Review" | "Done";
  tasks: Task[];
  onDrop: (
    taskId: string,
    newStatus: "To Do" | "In Progress" | "In Review" | "Done",
  ) => void;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item: Task) => onDrop(item._id, status),
    collect: (monitor: { isOver: () => void }) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const filteredTasks: Task[] = tasks.filter((task) => task.status === status);

  return (
    <div
      ref={drop}
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
            onDrop={(task) => onDrop(task._id, status)}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
