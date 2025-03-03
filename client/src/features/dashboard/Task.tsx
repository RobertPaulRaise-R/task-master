import { PiCalendarDotsDuotone, PiCalendarDuotone } from "react-icons/pi";
import Priority from "../tasks/Priority";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi2";
import { MdOutlinePerson } from "react-icons/md";

interface TaskType {
  name: string;
  dueDate: string;
  status: string;
  assignedTo: string;
  priority: "high" | "medium" | "low";
}

function Task({ item }: { item: TaskType }) {
  return (
    <div className="border-light-400 flex min-h-20 justify-between rounded-md border p-4">
      <div className="flex flex-col gap-1">
        <span className="col-span-4 text-[16px] font-medium">{item.name}</span>
        <div className="text-light-700 flex items-center gap-3 text-[14px]">
          <span className="flex items-center gap-1">
            <FaRegCalendarAlt />
            {item.dueDate}
          </span>
          <span className="flex items-center gap-0.5">
            <HiOutlineClock />
            {item.status}
          </span>
          <span className="flex items-center gap-0.5">
            <MdOutlinePerson />
            {item.assignedTo}
          </span>
        </div>
      </div>

      <span className="col-start-5 text-xs font-semibold text-[#4A4A4A]">
        <Priority priority={item.priority} />
      </span>
    </div>
  );
}

export default Task;
