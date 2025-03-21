import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanColumn from "../features/tasks/KanbanColumn";
import TaskListView from "../features/tasks/TaskListView";
import { initialTasks } from "../data";

import { useForm } from "react-hook-form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [showForm, setShowForm] = useState(false);

  const handleDrop = (taskId: string, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const handleShowForm = () => {
    setShowForm((show) => !show);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const statuses = ["To Do", "In Progress", "In Review", "Completed"];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <div className="mb-4 flex justify-between">
          <div className="flex gap-4">
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

          <button
            className="bg-brand-600 cursor-pointer rounded-sm px-3 py-2"
            onClick={handleShowForm}
          >
            New Task
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormRow>
              <span>Task Name</span>
              <Input {...register("taskName", { required: true })} />
            </FormRow>

            <FormRow>
              <span>Task Description</span>
              <Input {...register("taskDescription", { required: true })} />
            </FormRow>

            <FormRow>
              <span>Task Priority</span>
              <select
                className="border px-4 py-2"
                {...register("taskPriority", { required: true })}
              >
                <option value={"low"}>Low</option>
                <option value={"medium"}>Medium</option>
                <option value={"high"}>High</option>
              </select>
            </FormRow>

            <FormRow>
              <span>Task Due Date</span>
              <input
                type="date"
                {...register("taskDueDate", { required: true })}
              />
            </FormRow>

            <button type="submit" className="bg-brand-600 py-2">
              Create
            </button>
          </form>
        )}

        {view === "kanban" ? (
          <div className="mt-10 grid grid-cols-4 gap-4">
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
