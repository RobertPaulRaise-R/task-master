import { useState, useCallback } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import KanbanColumn from "../features/tasks/KanbanColumn"; // Make sure your path is correct
import TaskListView from "../features/tasks/TaskListView"; // Make sure your path is correct

import { useForm } from "react-hook-form";
import FormRow from "../ui/FormRow"; // Make sure your path is correct
import Input from "../ui/Input"; // Make sure your path is correct
import { Task } from "../types"; // Make sure your path is correct
import { useTasks } from "../features/tasks/useTasks"; // Make sure your path is correct
import Spinner from "../ui/Spinner"; // Make sure your path is correct
import ModalView from "../ui/ModalView"; // Make sure your path is correct
import { useMutation } from "@tanstack/react-query";
import { createTask } from "../services/taskApi";
// import { useMutation } from "@tanstack/react-query"; // Make sure your path is correct

function Tasks() {
  const { isPending, error, tasks: tasksData } = useTasks();

  const {
    register,
    handleSubmit,
    // formState: { errors }, // You can use this for form validation
    reset,
  } = useForm<{
    taskName: string;
    taskDescription: string;
    taskPriority: "low" | "medium" | "high";
    taskDueDate: string;
  }>();

  const [tasks, setTasks] = useState<Task[]>(tasksData as Task[]);
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [showForm, setShowForm] = useState(false);

  const handleTaskDrop = useCallback(
    (
      taskId: string,
      newStatus: "To Do" | "In Progress" | "In Review" | "Done",
    ) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task,
        ),
      );
    },
    [],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active && over && active.id !== over.id) {
        handleTaskDrop(active.id as string, over.id as Task["status"]);
      }
    },
    [handleTaskDrop],
  );

  const handleShowForm = () => {
    setShowForm((show) => !show);
  };

  const mutation = useMutation({ mutationFn: createTask });

  const onSubmit = (data: {
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High";
    dueDate: string;
  }) => {
    // In a real app, you'd use a mutation to create the task on the server
    // const newTask: Task = {
    //   title: data.taskName,
    //   description: data.taskDescription,
    //   status: "To Do", //  default status
    //   priority: data.taskPriority,
    //   dueDate: data.taskDueDate,
    // };
    mutation.mutate(data);

    // setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowForm(false);
    reset(); // Reset the form after successful submission
  };

  const statuses = ["To Do", "In Progress", "In Review", "Done"];

  if (isPending) return <Spinner size={10} />;

  if (error) throw new Error("There is no tasks");

  return (
    <DndContext onDragEnd={handleDragEnd}>
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

        <ModalView
          title="Create New Task"
          isOpen={showForm}
          onClose={() => setShowForm((show) => !show)}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormRow>
              <label className="text-light-600">Task Name</label>
              <Input
                {...register("taskName", { required: true })}
                placeholder="Create a doom game in typescript"
              />
            </FormRow>

            <FormRow>
              <label className="text-light-600">Task Description</label>
              <Input
                {...register("taskDescription", { required: true })}
                placeholder="Create a react typescript project and express as the backend and use sql lite for database"
              />
            </FormRow>

            <FormRow>
              <label className="text-light-600">Task Priority</label>
              <select
                className="border-light-800 rounded-sm border px-4 py-2"
                {...register("taskPriority", { required: true })}
              >
                <option value={"low"}>Low</option>
                <option value={"medium"}>Medium</option>
                <option value={"high"}>High</option>
              </select>
            </FormRow>

            <FormRow>
              <label className="text-light-600">Task Due Date</label>
              <Input
                type="date"
                {...register("taskDueDate", { required: true })}
              />
            </FormRow>

            <button type="submit" className="bg-brand-600 py-2">
              Create
            </button>
          </form>
        </ModalView>

        {view === "kanban" ? (
          <div className="mt-10 grid grid-cols-4 gap-4">
            {statuses.map((status) => (
              <KanbanColumn
                key={status}
                status={status as Task["status"]}
                tasks={tasks}
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
    </DndContext>
  );
}

export default Tasks;
