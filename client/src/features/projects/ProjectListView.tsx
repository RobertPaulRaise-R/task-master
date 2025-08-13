import { useNavigate } from "react-router";
import { ProjectI } from "../../types";

function ProjectListView({ project }: { project: ProjectI }) {
    const navigate = useNavigate();
    return (
        <div
            className="border-light-400 dark:border-neutral-700 dark:bg-neutral-800 rounded-md border p-4 hover:cursor-pointer"
            onClick={() => navigate(`/app/projects/${project._id}/`)}
        >
            <h3 className="font-medium">{project.name}</h3>
            <p className="text-light-700 dark:text-neutral-400">{project.createdBy.name}</p>
        </div>
    );
}

export default ProjectListView;
