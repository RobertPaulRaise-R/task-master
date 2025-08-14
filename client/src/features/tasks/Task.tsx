import { useTaskById } from "../../api/queries/useTaskById";
import TaskDetailCard from "./TaskDetailCard";

function Task() {
    const { task, isPending, isError } = useTaskById();

    if (isPending) return <span>Fetching task</span>
    if (isError) return <span>Error while fetching the task</span>

    return (
        <div className="my-4 px-4 grid grid-cols-1 lg:grid-cols-2">
            <TaskDetailCard task={task}/>

        </div>
    );
}

export default Task;
