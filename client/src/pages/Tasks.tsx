import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanColumn from "../features/tasks/KanbanColumn";
import TaskListView from "../features/tasks/TaskListView";
import { initialTasks } from "../data";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  projectId: string;
  userId: string;
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [view, setView] = useState<"kanban" | "list">("kanban");

  const handleDrop = (taskId: string, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const statuses = ["To Do", "In Progress", "In Review", "Completed"];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <div className="mb-4 flex gap-4">
          <button
            onClick={() => setView("kanban")}
            className={`rounded px-4 py-2 ${
              view === "kanban"
                ? "bg-blue-500 text-white"
                : "bg-brand-200 text-brand-900"
            }`}
          >
            Kanban
          </button>
          <button
            onClick={() => setView("list")}
            className={`rounded px-4 py-2 ${
              view === "list"
                ? "bg-blue-500 text-white"
                : "bg-brand-200 text-brand-900"
            }`}
          >
            List
          </button>
        </div>

        {view === "kanban" ? (
          <div className="mt-5 grid grid-cols-4 gap-4">
            {statuses.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                tasks={tasks}
                onDrop={handleDrop}
              />
            ))}
          </div>
        ) : (
          <div className="mt-5">
            {statuses.map((status) => (
              <TaskListView status={status} tasks={tasks} />
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
}

export default Tasks;
