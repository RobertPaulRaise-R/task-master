// function Tasks() {
//   return (
//     <div className="p-4">
//       <div className="flex gap-4">
//         <button>Kanban</button>
//         <button>List</button>
//       </div>

//       <div className="mt-5 grid grid-cols-4 gap-4">
//         <div>
//           <KanbanHeader label="To Do" />
//           {/* Here the list of task will come */}
//         </div>

//         <div>
//           {/* Here the list of task will come */}
//           <KanbanHeader label="In Progress" />
//         </div>

//         <div>
//           <KanbanHeader label="In Review" />
//           {/* Here the list of task will come */}
//         </div>

//         <div>
//           <KanbanHeader label="Completed" />
//           {/* Here the list of task will come */}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanColumn from "../features/tasks/KanbanColumn";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
  projectId: string;
  userId: string;
}

const initialTasks: Task[] = [
  {
    id: "kihfs9i72kijfd",
    title: "Create Table",
    status: "To Do",
    priority: "Low",
    dueDate: "2024-02-21",
    projectId: "iufg8254698yu",
    userId: "872736826gjhg",
  },
  {
    id: "kihfs9i72kugef",
    title: "Create Timeline",
    status: "To Do",
    priority: "Low",
    dueDate: "2024-02-21",
    projectId: "iufg8254698yu",
    userId: "872736826gjhg",
  },
  {
    id: "kihfs9i72kijhjgf",
    title: "Create Karen",
    status: "To Do",
    priority: "Low",
    dueDate: "2024-02-21",
    projectId: "iufg8254698yu",
    userId: "872736826gjhg",
  },
];

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
            <h2 className="text-brand-900 mb-4 font-bold">Task List View</h2>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-brand-50 mb-2 rounded border p-3"
              >
                <h3 className="text-brand-900 font-medium">{task.title}</h3>
                <p className="text-brand-600 text-sm">
                  {task.priority} Priority
                </p>
                <span className="text-brand-700 text-xs">
                  Status: {task.status}, Due:{" "}
                  {new Date(task.dueDate).toLocaleDateString("en-GB")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
}

export default Tasks;
