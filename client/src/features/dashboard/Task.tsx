import Priority from "../tasks/Priority";

interface TaskType {
  name: string;
  dueDate: string;
  status: string;
  assignedTo: string;
  priority: "high" | "medium" | "low";
}

function Task({ item }: { item: TaskType }) {
  return (
    <div className="flex justify-between border border-[#e4e4e7] p-4 min-h-20 rounded-md">
      <div className="flex flex-col gap-1">
        <span className="text-[16px] font-medium col-span-4">{item.name}</span>
        <div className="flex items-center gap-3 text-[#71717a] text-[14px]">
          <span>{item.dueDate}</span>
          <span>{item.status}</span>
          <span>{item.assignedTo}</span>
        </div>
      </div>

      <span className="col-start-5 text-xs text-[#4A4A4A] font-semibold">
        <Priority priority={item.priority} />
      </span>
    </div>
  );
}

export default Task;
