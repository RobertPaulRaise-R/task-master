import ListSection from "../features/dashboard/ListSection";
import TaskItem from "../features/dashboard/TaskItem";
import { Task } from "../types";
import Spinner from "../ui/Spinner";
import { useTasks } from "../features/tasks/useTasks";
import StatsCard from "../features/dashboard/StatsCard";
import { BiPlusCircle } from "react-icons/bi";

const cardsData = [
  { name: "Total Projects", value: 1 },
  { name: "Total Tasks", value: 3 },
  { name: "Assigned Tasks", value: 0 },
  { name: "Completed Tasks", value: 1 },
];

function Dashboard() {
  const { isPending, tasks } = useTasks();
  const projects = [];

  if (isPending) return <Spinner size={10} />;

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
            <div></div>
          </ListSection.Header>

          <ListSection.List>
            {tasks.length > 0 ? (
              tasks.map((item: Task, i: number) => (
                <TaskItem item={item} key={i} />
              ))
            ) : (
              <span>There is no tasks right now</span>
            )}
          </ListSection.List>
        </ListSection>

        {/* Project Section */}
        <ListSection>
          <ListSection.Header label="Projects">
            <div></div>
          </ListSection.Header>

          <ListSection.List>
            {projects.length > 0 ? (
              tasks.map((item: Task, i: number) => (
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

        <ListSection>
          <ListSection.Header label="People">
            <div></div>
          </ListSection.Header>

          <ListSection.List>
            {projects.length > 0 ? (
              tasks.map((item: Task, i: number) => (
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
