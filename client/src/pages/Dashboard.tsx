import ListSection from "../features/dashboard/ListSection";
import TaskItem from "../features/dashboard/TaskItem";
import { Task } from "../types";
import Spinner from "../ui/Spinner";
import { useTasks } from "../features/tasks/useTasks";

function Dashboard() {
  const { isPending, error, tasks } = useTasks();

  if (isPending) return <Spinner size={10} />;

  if (error) throw new Error("Tasks not available");

  console.log(tasks);

  return (
    <div className="mx-4 pt-4">
      <div className="grid grid-cols-2 gap-x-10 gap-y-4">
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
      </div>
    </div>
  );
}

export default Dashboard;
