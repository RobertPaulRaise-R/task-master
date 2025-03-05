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
      className={`bg-brand-200 border-brand-300 flex-1 rounded-lg border p-4 ${
        isOver ? "bg-brand-300" : ""
      }`}
    >
      <h2 className="text-brand-900 mb-4 font-bold">{status}</h2>
      {filteredTasks.map((task: TaskType) => (
        <TaskCard
          key={task.id}
          task={task}
          onDrop={(task) => onDrop(task.id, status)}
        />
      ))}
    </div>
  );
}

export default KanbanColumn;
