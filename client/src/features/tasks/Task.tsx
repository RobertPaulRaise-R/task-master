import { useTaskById } from "../../api/queries/useTaskById";

function Task() {
    const { task, isPending, isError } = useTaskById();

    console.log(task);

    if (isPending) return <span>Fetching task</span>
    if (isError) return <span>Error while fetching the task</span>

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <span>{task.name}</span>
            </div>
            <div></div>
        </div>
    );
}

export default Task;
