import { useDrop } from "react-dnd";
import TaskCard, { TaskType } from "../tasks/TaskCard";
import { ItemTypes } from "../tasks/TaskCard";

function KanbanColumn({ status, tasks, onDrop }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item) => onDrop(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const filteredTasks = tasks.filter((task) => task.status === status);

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
        {filteredTasks.map((task: TaskType) => (
          <TaskCard
            key={task.id}
            task={task}
            onDrop={(task) => onDrop(task.id, status)}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
