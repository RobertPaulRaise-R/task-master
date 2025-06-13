import { useState, useCallback, useEffect } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import KanbanColumn from "../features/tasks/KanbanColumn";
import TaskListView from "../features/tasks/TaskListView";

import { useForm } from "react-hook-form";
import FormRow from "../ui/FormRow"; // Make sure your path is correct
import Input from "../ui/Input"; // Make sure your path is correct
import { Task } from "../types"; // Make sure your path is correct
import { useTasks } from "../features/tasks/useTasks"; // Make sure your path is correct
import Spinner from "../ui/Spinner"; // Make sure your path is correct
import ModalView from "../ui/ModalView"; // Make sure your path is correct
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../services/taskApi";
import { updateTaskStatus } from "../features/tasks/updateTaskStatus";

function Tasks() {
  const { isPending, tasks: tasksData, error } = useTasks();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<{
    taskName: string;
    taskDescription: string;
    taskPriority: "low" | "medium" | "high";
    taskDueDate: string;
  }>();

  const [tasks, setTasks] = useState<Task[]>(tasksData || []); // Initialize with empty array
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData);
    }
  }, [tasksData]);

  // Update local state immediately
  const handleLocalTaskDrop = useCallback(
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

  const updateTaskStatusMutation = useMutation({
    mutationFn: ({
      taskId,
      status,
    }: {
      taskId: string;
      status: Task["status"];
    }) => updateTaskStatus(taskId, status),
    onSuccess: () => {
      // Invalidate the tasks query to refetch updated data
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: (error) => {
      console.error("Error updating task status:", error);
      // Optionally, revert the local state update if the server update fails
      // You might need to keep track of the previous state to do this effectively.
    },
  });

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active && over && active.id !== over.id) {
        const taskId = active.id as string;
        const newStatus = over.id as Task["status"];
        handleLocalTaskDrop(taskId, newStatus);
        updateTaskStatusMutation.mutate({ taskId, status: newStatus });
      }
    },
    [handleLocalTaskDrop, updateTaskStatusMutation],
  );

  const handleShowForm = () => {
    setShowForm((show) => !show);
  };

  const createTaskMutation = useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      priority: "Low" | "Medium" | "High";
      dueDate: string;
    }) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setShowForm(false);
      reset();
    },
    onError: (error) => {
      console.error("Error creating task:", error);
      // Optionally display an error message to the user
    },
  });

  const onSubmit = (data: {
    taskName: string;
    taskDescription: string;
    taskPriority: "Low" | "Medium" | "High";
    taskDueDate: string;
  }) => {
    createTaskMutation.mutate({
      title: data.taskName,
      description: data.taskDescription,
      priority:
        data.taskPriority.charAt(0).toUpperCase() + data.taskPriority.slice(1), // Capitalize priority
      dueDate: data.taskDueDate,
    });
  };

  const statuses = ["To Do", "In Progress", "In Review", "Done"];

  if (isPending) return <Spinner size={10} />;

  if (error) return <p className="text-red-500">Error loading tasks!</p>;

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
