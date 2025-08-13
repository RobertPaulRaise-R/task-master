import ListSection from "../features/dashboard/ListSection";
import TaskItem from "../features/dashboard/TaskItem";
import { ProjectI, TaskI, UserI } from "../types";
import StatsCard from "../features/dashboard/StatsCard";
import ProjectList from "../features/projects/ProjectListView";
import React, { useMemo, useState } from "react";
import Sortable from "../ui/Sortable";
import { BsPlusLg } from "react-icons/bs";
import PeopleListView from "../features/dashboard/PeopleListView";
import ModalView from "../ui/ModalView";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import Label from "../ui/Label";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { useProjects } from "../api/queries/useProjects";
import { useTasks } from "../api/queries/useTasks";

const cardsData = [
    { name: "Total Projects", value: 10 },
    { name: "Total Tasks", value: 3 },
    { name: "Assigned Tasks", value: 0 },
    { name: "Completed Tasks", value: 1 },
];

const taskSortables = [
    "Sort By Title(A-Z)",
    "Sort By Title(Z-A)",
    "Nearest Due Date",
    "Sort By Priority(Highest)",
    "Sort By Priority(Lowest)",
];

const peoples: UserI[] = [];

function Dashboard() {
    const { register, handleSubmit } = useForm();

    const { isPending: isTaskPending, tasks: tasksData, isError: isTaskError } = useTasks();
    const { projects, isPending: isProjectPending, isError: isProjectError } = useProjects();

    const [showForm, setShowForm] = useState<boolean>(false);
    const [taskFilter, setTaskFilter] = useState<string>(taskSortables[2]);

    const sortedTasks = useMemo(() => {
        if (!tasksData) return [];
        return [...tasksData].sort((a, b) => {
            if (taskFilter === "Sort By Title(A-Z)") {
                return a.name.localeCompare(b.name);
            } else if (taskFilter === "Sort By Title(Z-A)") {
                return b.name.localeCompare(a.name);
            } else if (taskFilter === "Nearest Due Date") {
                const dateA = new Date(a.dueDate);
                const dateB = new Date(b.dueDate);
                if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
                if (isNaN(dateA.getTime())) return 1;
                if (isNaN(dateB.getTime())) return -1;
                return dateA.getTime() - dateB.getTime();
            }
            return 0;
        })
    }, [tasksData, taskFilter]);

    const onSubmit = () => { };

    const isPending = isTaskPending || isProjectPending;
    const isError = isTaskError || isProjectError;
    if (isPending) return <Spinner size={10} />;
    if (isError) return <p>Error loading dashboard</p>;

    return (
        <div className="mx-4 py-4">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                {cardsData.map((card) => (
                    <StatsCard name={card.name} value={card.value} key={card.name} />
                ))}
            </div>

            <div className="my-10 grid grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-2">
                <ListSection>
                    <ListSection.Header label="Assigned Tasks">
                        <div>
                            <Sortable
                                sortable={taskSortables}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTaskFilter(e.target.value)}
                                value={taskFilter}
                            />
                        </div>
                    </ListSection.Header>

                    <ListSection.List>
                        {!isTaskPending && sortedTasks.length > 0 ? (
                            sortedTasks.map((item: TaskI, i: number) => (
                                <TaskItem item={item} key={i} />
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center">
                                <div>
                                    <div className="bg-light-400 dark:bg-neutral-700 p-2 flex items-center justify-between gap-3 rounded-lg">
                                        <div className="bg-light-200 dark:bg-neutral-800 h-18 w-18 rounded-lg"></div>

                                        <div className="flex flex-col gap-1">
                                            <div className="bg-light-200 dark:bg-neutral-800 h-4 w-32 rounded-lg"></div>
                                            <div className="bg-light-200 dark:bg-neutral-800 h-4 w-32 rounded-lg"></div>
                                            <div className="bg-light-200 dark:bg-neutral-800 h-4 w-32 rounded-lg"></div>
                                        </div>
                                    </div>
                                </div>
                                <span className="font-medium pt-4">You don't assigned to any task</span>
                                <p className="text-light-700 dark:text-neutral-400 text-sm">List of tasks you've assigned will appear here.</p>
                            </div>
                        )}
                    </ListSection.List>
                </ListSection>

                {/* PROJECT SECTION */}
                <ListSection>
                    <ListSection.Header label="Projects">
                        <div></div>
                    </ListSection.Header>

                    <ListSection.List>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <button
                                onClick={() => setShowForm(true)}
                                className="flex items-center gap-4 border border-light-400 dark:border-neutral-700 p-2 rounded-lg cursor-pointer">
                                <p className="p-4 bg-light-300 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                                    <BsPlusLg size={20} />
                                </p>
                                <span className="font-medium">
                                    New Project
                                </span>
                            </button>

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
                                        <Label label="Project Name" />
                                        <Input
                                            {...register("taskName", { required: true })}
                                            placeholder="Create a doom game in typescript"
                                        />
                                    </FormRow>

                                    <FormRow>
                                        <Label label="Project Description" />
                                        <Input
                                            {...register("taskDescription", { required: true })}
                                            placeholder="Create a react typescript project and express as the backend and use sql lite for database"
                                        />
                                    </FormRow>


                                    <div className="flex items-center justify-end gap-3">
                                        <Button btn="secondary" >
                                            Cancel
                                        </Button>
                                        <Button type="submit" btn="primary">
                                            Create
                                        </Button>
                                    </div>
                                </form>
                            </ModalView>


                            {!isProjectPending && projects && projects.length > 0 ? (
                                projects.map((project: ProjectI, i: number) => (
                                    <ProjectList project={project} key={i} />
                                ))
                            ) : null}
                        </div>
                    </ListSection.List>
                </ListSection>

                <ListSection>
                    <ListSection.Header label="People">
                        <div></div>
                    </ListSection.Header>

                    <ListSection.List>
                        {peoples.length > 0 ? (
                            peoples.map((user: UserI, i: number) => (
                                <PeopleListView key={i} person={user} />
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center">
                                <div>
                                    <div>
                                    </div>
                                </div>
                                <span className="font-medium pt-4">There's no people in your workspace</span>
                                <p className="text-light-700 dark:text-neutral-400 text-sm">Start inviting your co-workers now!</p>
                            </div>
                        )}
                    </ListSection.List>
                </ListSection>
            </div>
        </div>
    );
}

export default Dashboard;
