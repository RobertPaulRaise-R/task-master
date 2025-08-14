import { useState, useCallback } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import KanbanColumn from "../features/tasks/KanbanColumn";
import TaskListView from "../features/tasks/TaskListView";

import { TaskI } from "../types";
import Spinner from "../ui/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../ui/Button";
import { useTasks } from "../api/queries/useTasks";
import { useUpdateTaskMutation } from "../api/mutations/useUpdateTaskMutation";

function Tasks() {
    const { isPending, tasks: tasksData, error } = useTasks();
    const { mutate } = useUpdateTaskMutation();
    const queryClient = useQueryClient();

    const [view, setView] = useState<"kanban" | "list">("kanban");

    const handleLocalTaskDrop = useCallback(
        (taskId: string, newStatus: TaskI["status"]) => {
            queryClient.setQueryData<TaskI[]>(["tasks"], (oldTasks) => {
                if (!oldTasks) return oldTasks;
                return oldTasks.map((task) =>
                    task._id === taskId ? { ...task, status: newStatus } : task
                );
            });
        },
        [queryClient],
    );


    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event;

            if (active && over && active.id !== over.id) {
                const taskId = active.id as string;
                const newStatus = over.id as TaskI["status"];
                handleLocalTaskDrop(taskId, newStatus);
                mutate({ _id: taskId, status: newStatus });
            }
        },
        [handleLocalTaskDrop, mutate],
    );

    const statuses = ["todo", "in_progress", "done"];

    if (isPending) return <Spinner size={10} />;

    if (error) return <p className="text-red-500">Error loading tasks!</p>;

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="p-4">
                <div className="mb-4 flex justify-between">
                    <div className="flex gap-4">
                        <Button btn="secondary"
                            onClick={() => setView("kanban")}
                            className={`rounded px-4 py-2 ${view === "kanban"
                                ? "bg-blue-500 text-white"
                                : "bg-brand-200 text-brand-900"
                                }`}
                        >
                            Kanban
                        </Button>
                        <Button btn="secondary"
                            onClick={() => setView("list")}
                            className={`rounded px-4 py-2 ${view === "list"
                                ? "bg-blue-500 text-white"
                                : "bg-brand-200 text-brand-900"
                                }`}
                        >
                            List
                        </Button>
                    </div>

                </div>

                {view === "kanban" ? (
                    <div className="mt-10 grid grid-cols-3 gap-4">
                        {statuses.map((status) => (
                            <KanbanColumn
                                key={status}
                                status={status as TaskI["status"]}
                                tasks={tasksData}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-5">
                        {statuses.map((status) => (
                            <TaskListView status={status} tasks={tasksData} />
                        ))}
                    </div>
                )}
            </div>
        </DndContext>
    );
}

export default Tasks;
