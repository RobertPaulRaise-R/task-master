import { TaskI } from "../../types";
import { getDate } from "../../utils/getDate";
import Priority from "./Priority";
import { SlOptionsVertical } from "react-icons/sl";

function TaskListView({ status, tasks }: { status: string; tasks: TaskI[] }) {
    const task = tasks.filter((t) => t.status === status);

    return (
        <div className="mt-5">
            <div className="bg-light-300 rounded-lg p-2">
                <span>{status}</span>
            </div>

            <div className="mt-3 flex flex-col gap-3">
                {task.map((t) => (
                    <div className="border-light-200 grid grid-cols-24 items-center gap-2 border p-2">
                        <input type="checkbox" className="col-span-1" />
                        <span className="col-span-7 font-medium">{t.name}</span>
                        <span className="col-span-7 place-items-center align-middle text-sm">
                            {t.description}
                        </span>
                        <span className="text-light-600 col-span-2 text-xs">
                            {getDate(t.dueDate)}
                        </span>

                        <div className="col-span-2">
                            <Priority priority={t.priority} />
                        </div>

                        <span className="text-light-600 col-span-3 flex text-xs">
                            <div className="bg-light-400 size-8 rounded-full text-center">
                                B
                            </div>
                            <div className="bg-light-400 size-8 rounded-full text-center">
                                B
                            </div>
                            <div className="bg-light-400 size-8 rounded-full text-center">
                                B
                            </div>
                        </span>

                        <span className="col-span-1 place-self-center">
                            <SlOptionsVertical className="block" />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskListView;
