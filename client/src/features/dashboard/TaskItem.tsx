import Priority from "../tasks/Priority";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi2";
import { Task } from "../../types";
import { Link } from "react-router";
import { getDate } from "../../utils/getDate";
// import { MdOutlinePerson } from "react-icons/md";

function TaskItem({ item }: { item: Task }) {
  const date = getDate(item.dueDate);

  return (
    <Link
      to={`/app/tasks/${item._id}`}
      className="border-light-400 flex min-h-20 justify-between rounded-md border p-4 hover:cursor-pointer"
    >
      <div className="flex flex-col gap-1">
        <span className="col-span-4 line-clamp-1 text-[16px] font-medium">
          {item.title}
        </span>
        <div className="text-light-700 flex items-center gap-3 text-[14px]">
          <span className="flex items-center gap-1">
            <FaRegCalendarAlt />
            {date}
          </span>
          <span className="flex items-center gap-0.5">
            <HiOutlineClock />
            {item.status}
          </span>
          {/* <span className="flex items-center gap-0.5">
            <MdOutlinePerson />
            {item.userId}
          </span> */}
        </div>
      </div>

      <span className="col-start-5 text-xs font-semibold text-[#4A4A4A]">
        <Priority priority={item.priority} />
      </span>
    </Link>
  );
}

export default TaskItem;
