import ListSection from "../features/dashboard/ListSection";
import TaskItem from "../features/dashboard/TaskItem";
import { ProjectI, TaskI, UserI } from "../types";
import Spinner from "../ui/Spinner";
import { useTasks } from "../features/tasks/useTasks";
import StatsCard from "../features/dashboard/StatsCard";
import { BiPlusCircle } from "react-icons/bi";
import { useProjects } from "../features/projects/useProjects";
import ProjectList from "../features/projects/ProjectListView";
import React, { useEffect, useMemo, useState } from "react";
import Sortable from "../ui/Sortable";

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

function Dashboard() {
  const { isPending: isTaskPending, isError: isTaskError, tasks: tasksData} = useTasks();
  const {
    isPending: isProjectPending,
    isError: isProjectError,
    projects,
  } = useProjects();

  useEffect(() => {
      if (projects) {
          cardsData[0].value = projects.length;
      }
  }, [projects]);


  const [taskFilter, setTaskFilter] = useState<string>("");

  const sortedTasks = useMemo(() => { 
      if (!tasksData) return [];
      return [...tasksData].sort((a,b) => {
      if (taskFilter === "Sort By Title(A-Z)") {
          return a.title.localeCompare(b.title);
      } else if (taskFilter === "Sort By Title(Z-A)") {
          return b.title.localeCompare(a.title);
      }
      return 0;
  })}, [tasksData, taskFilter]);

  const isPending = isTaskPending || isProjectPending;
  const isError = isTaskError || isProjectError;

  if (isPending) return <Spinner size={10} />;
  if (isError) return <p>Error loading dashboard</p>;

  return (
    <div className="mx-4 py-4">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {cardsData.map((card) => (
          <StatsCard name={card.name} value={card.value} />
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-2">
        <ListSection>
          <ListSection.Header label="Assigned Tasks">
            <div>
            {/*
                <select
                    defaultValue="Sort By Title(A-Z)" 
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTaskFilter(e.target.value)}
                    className="text-sm"
                >
                    {taskSortables.map((s) => (
                        <option value={s}>{s}</option>
                    ))}
                </select>
                */}
                <Sortable 
                    sortable={taskSortables}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTaskFilter(e.target.value)}
                    value={taskFilter}
                />
            </div>
          </ListSection.Header>

          <ListSection.List>
            {sortedTasks.length > 0 ? (
              sortedTasks.map((item: TaskI, i: number) => (
                <TaskItem item={item} key={i} />
              ))
            ) : (
              <span>There is no tasks right now</span>
            )}
          </ListSection.List>
        </ListSection>

        {/* PROJECT SECTION */}
        <ListSection>
          <ListSection.Header label="Projects">
            <div></div>
          </ListSection.Header>

          <ListSection.List>
            {projects && projects.length > 0 ? (
              projects.map((project: ProjectI, i: number) => (
                <ProjectList project={project} key={i} />
              ))
            ) : (
              <div>
                <button className="border-light-300 flex items-center gap-3 rounded-md border px-6 py-3 hover:cursor-pointer">
                  <BiPlusCircle size={32} color="#4b5563" />
                  <span className="text-light-700 font-medium">
                    New Project
                  </span>
                </button>
              </div>
            )}
          </ListSection.List>
        </ListSection>

        <ListSection>
          <ListSection.Header label="People">
            <div></div>
          </ListSection.Header>

          <ListSection.List>
            {projects.length > 0 ? (
              projects.map((item: UserI, i: number) => (
                <TaskItem item={item} key={i} />
              ))
            ) : (
              <div>
                <button className="border-light-300 flex items-center gap-3 rounded-md border px-6 py-3 hover:cursor-pointer">
                  <BiPlusCircle size={32} color="#4b5563" />
                  <span className="text-light-700 font-medium">
                    New Project
                  </span>
                </button>
              </div>
            )}
          </ListSection.List>
        </ListSection>
      </div>
    </div>
  );
}

export default Dashboard;
