/*
import { TaskI } from "../../types";
import UserAvatar from "./UserAvatar";

// Component for a single task bar on the timeline
const TaskBar = ({ task, firstDay } : { task: TaskI; firstDay: number }) => {
  // Calculate grid column start and span based on task days
  // Add 2: 1 for the team name column, 1 because grid columns are 1-indexed
  const startColumn = task.startDay - firstDay + 2;
  const span = task.endDay - task.startDay + 1;

  // Ensure span is at least 1
  const columnSpan = Math.max(1, span);

  return (
    <div
      className={`col-start-${startColumn} col-span-${columnSpan} ${task.color} relative z-10 my-1 flex h-10 items-center justify-between rounded-lg p-2 text-sm text-white shadow-md`}
      style={{
        gridColumnStart: startColumn,
        gridColumnEnd: `span ${columnSpan}`,
      }} // Inline style for dynamic grid placement
    >
      <span className="truncate font-medium">{task.title}</span>
      <div className="flex flex-shrink-0 items-center space-x-2">
        {task.progress && (
          <span className="bg-opacity-20 rounded bg-black px-1.5 py-0.5 text-xs font-semibold">
            {task.progress}
          </span>
        )}
        <div className="flex items-center">
          {task.users.map((userId, index) => (
            <UserAvatar key={userId + index} userId={userId} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBar;
*/
