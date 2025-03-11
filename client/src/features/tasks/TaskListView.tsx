import { Task } from "../../pages/Tasks";
import Priority from "./Priority";

function TaskListView({ status, tasks }: { status: string; tasks: Task[] }) {
  const task = tasks.filter((t) => t.status === status);

  return (
    <div className="mt-5">
      <div className="bg-light-300 rounded-lg p-2">
        <span>{status}</span>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {task.map((t) => (
          <div className="border-light-200 grid grid-cols-24 items-center border p-2">
            <input type="checkbox" className="col-span-1" />
            <span className="col-span-6">{t.title}</span>
            <span className="col-span-6">{t.description}</span>
            <span className="col-span-3">{t.dueDate}</span>
            <div className="col-span-2">
              <Priority priority={t.priority} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskListView;
