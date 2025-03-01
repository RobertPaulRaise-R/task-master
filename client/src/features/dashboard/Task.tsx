import { MdOutlineDelete, MdOutlineDone } from "react-icons/md";
import IconButton from "../../ui/IconButton";

interface TaskType {
  dueDate: string;
  name: string;
}

function Task({ item }: { item: TaskType }) {
  return (
    <div className="h-18 my-2.5 mx-3 px-3 bg-[#30332E] border-[#E0E0E0] border rounded-md grid grid-cols-6 items-center gap-3 shadow-sm">
      <span className="col-span-4 overflow-hidden">{item.name}</span>

      <span className="col-start-5 text-xs text-[#4A4A4A] font-semibold">
        {item.dueDate}
      </span>

      <div className="col-start-6 flex items-center justify-center gap-2">
        <IconButton bgColor="bg-[#00C851]">
          <MdOutlineDone size={20} color="#000" />
        </IconButton>
        <IconButton bgColor="bg-red-500">
          <MdOutlineDelete size={20} color="#000" />
        </IconButton>
      </div>
    </div>
  );
}

export default Task;
