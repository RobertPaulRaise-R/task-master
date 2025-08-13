import { useState } from "react";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import ModalView from "../../ui/ModalView";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import TaskCard from "../tasks/TaskCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { TaskI, UserI } from "../../types";
import Select from "../../ui/Select";
import SelectMember from "../../ui/SelectMember";
import { useProjectById } from "../../api/queries/useProjectById";
import { useTasksByProject } from "../../api/queries/useTasksByProject";
import { useWorkspaceMembers } from "../../api/queries/useWorkspaceMembers";
import { createTask } from "../../api/services/taskApi";

function Project() {
    const queryClient = useQueryClient();
    const workspace = useSelector((state: RootState) => state.workspace);

    const { project, isPending: isProjectPending, isError: isProjectError } = useProjectById();
    const { tasks, isPending: isTasksPending, isError: isTasksError } = useTasksByProject(project?._id);
    const { members, isPending: isMembersPending, isError: isMembersError } = useWorkspaceMembers();

    const [showTaskForm, setShowTaskForm] = useState(false);
    const [assignTo, setAssignTo] = useState<UserI | undefined>();
    const [priority, setPriority] = useState<string>("low");

    const { register, handleSubmit, reset } = useForm<{
        taskName: string;
        taskDescription: string;
        taskPriority: "low" | "medium" | "high";
        taskAssignedTo: string;
        taskDueDate: Date;

        teamName: string;
    }>();

    const createTaskMutation = useMutation({
        mutationFn: (data: {
            name: string;
            description: string;
            assignedTo?: string;
            priority: "low" | "medium" | "high";
            dueDate: Date;
            projectId: string | undefined;
            workspaceId: string;
        }) =>
            createTask(data),
        onSuccess: () => {
            queryClient.invalidateQueries([project._id] as InvalidateQueryFilters)
            setShowTaskForm(false);
            reset();
        },
        onError: (error) => {
            console.error("Team creation failed:", error);
            const errorMessage =
                error.message ||
                "Failed to create team";
            alert(errorMessage);
        },
    });

    const onCreateTaskSubmit = (data: {
        taskName: string;
        taskDescription: string;
        taskAssignedTo: string;
        taskPriority: "low" | "medium" | "high";
        taskDueDate: Date;
    }) => {
        createTaskMutation.mutate({
            name: data.taskName,
            description: data.taskDescription,
            assignedTo: assignTo?._id,
            priority: priority as "low" | "medium" | "high",
            dueDate: data.taskDueDate,
            projectId: project?._id,
            workspaceId: workspace._id
        });
    };

    const isPending = isProjectPending || isTasksPending || isMembersPending;
    const error = isProjectError || isTasksError || isMembersError;

    if (isPending) return <Spinner size={20} />;

    if (error) return <p>Project Details not available</p>;

    if (!project) return <p>Loading project details...</p>;

    return (
        <div className="m-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-brand-800 text-2xl font-semibold">
                        {project.name}
                    </h1>
                    <p className="text-light-800">{project.description}</p>
                </div>
                <Button btn="primary">Edit</Button>
            </div>

            <div className="mt-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-brand-800 text-xl font-medium">Tasks</h2>
                    <Button btn="primary" onClick={() => setShowTaskForm(true)}>New Task</Button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {tasks &&
                        tasks.length > 0 &&
                        tasks.map((task: TaskI) => <TaskCard key={task._id} task={task} />)}
                </div>

                <ModalView
                    title="Create New Task"
                    isOpen={showTaskForm}
                    onClose={() => setShowTaskForm((show) => !show)}
                >
                    <form
                        onSubmit={handleSubmit(onCreateTaskSubmit)}
                        className="flex flex-col gap-5"
                    >
                        <FormRow>
                            <label className="text-light-600">Name</label>
                            <Input
                                {...register("taskName", { required: true })}
                                placeholder="Enter a task name"
                            />
                        </FormRow>

                        <FormRow>
                            <label className="text-light-600">Description</label>
                            <Input
                                {...register("taskDescription", { required: true })}
                                placeholder="Enter the task description"
                            />
                        </FormRow>

                        <FormRow>
                            <label className="text-light-600">Assign To</label>
                            <SelectMember options={members} value={assignTo} setValue={setAssignTo} />
                        </FormRow>

                        <FormRow>
                            <label className="text-light-600">Task Priority</label>
                            <Select options={["low", "medium", "high"]} value={priority} setValue={setPriority} />
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
            </div>
        </div>
    );
}

export default Project;
