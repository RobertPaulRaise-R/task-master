import { HiEllipsisHorizontal } from "react-icons/hi2";
import { Link } from "react-router";
import IconButton from "../../ui/IconButton";

interface ProjectType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: number;
  clientName: string;
}

function ProjectCard({ project }: { project: ProjectType }) {
  return (
    <div className="border-light-300 grid grid-rows-3 gap-3 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <Link
          className="hover:text-brand-600 hover:underline"
          to={`/app/projects/${project.id}`}
        >
          {project.name}
        </Link>

        <IconButton>
          <HiEllipsisHorizontal />
        </IconButton>
      </div>

      <span className="line-clamp-2">{project.description}</span>

      <div className="flex items-center justify-between text-sm">
        <span>{project.clientName}</span>
        <span>{project.members} members</span>
      </div>
    </div>
  );
}

export default ProjectCard;
