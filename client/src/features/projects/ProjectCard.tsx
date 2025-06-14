import { HiEllipsisHorizontal } from "react-icons/hi2";
import { Link, useNavigate } from "react-router";
import IconButton from "../../ui/IconButton";
import DropdownMenu from "../../ui/DropdownMenu";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { ProjectI } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectById } from "../../services/projectApi";

function ProjectCard({ project }: { project: ProjectI }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteProjectMutation = useMutation({
    mutationFn: (data: string) => deleteProjectById(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const projectOptions = [
    {
      label: "Edit",
      icon: <MdModeEdit />,
      onClick: () => navigate("/app/projects/edit"),
    },
    {
      label: "Delete",
      icon: <MdDelete />,
      onClick: () => deleteProjectMutation.mutate(project._id),
    },
  ];

  console.log(project);

  return (
    <div className="border-light-300 grid grid-rows-3 gap-3 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <Link
          className="hover:text-brand-600 font-medium hover:underline"
          to={`/app/projects/${project._id}`}
        >
          {project.name}
        </Link>

        <DropdownMenu
          items={projectOptions}
          triggerElement={
            <IconButton>
              <HiEllipsisHorizontal />
            </IconButton>
          }
        ></DropdownMenu>
      </div>

      <span className="text-light-800 line-clamp-2 h-10 text-sm">
        {project.description}
      </span>

      <div className="flex items-center justify-between text-xs">
        <span className="text-brand-500">{project.createdBy.name}</span>
        <span>{project.teams.flat(Infinity).length} Member</span>
      </div>
    </div>
  );
}

export default ProjectCard;
