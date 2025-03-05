import ProjectCard from "../features/projects/ProjectCard";
import Button from "../ui/Button";

const projects = [
  {
    id: "asdas",
    name: "Task Master",
    description:
      "Task Mangement App askfjhajs asjh ashdsa dajhsdas djhasd jajsdhbj ",
    createdAt: "21/2/24",
    members: 2,
    clientName: "Robert Paul Raise",
  },

  {
    id: "asdas",
    name: "Task Master",
    description: "Task Mangement App",
    createdAt: "21/2/24",
    members: 2,
    clientName: "Robert Paul Raise",
  },

  {
    id: "asdas",
    name: "Task Master",
    description: "Task Mangement App",
    createdAt: "21/2/24",
    members: 2,
    clientName: "Robert Paul Raise",
  },

  {
    id: "asdas",
    name: "Task Master",
    description: "Task Mangement App",
    createdAt: "21/2/24",
    members: 2,
    clientName: "Robert Paul Raise",
  },

  {
    id: "asdas",
    name: "Task Master",
    description: "Task Mangement App",
    createdAt: "21/2/24",
    members: 2,
    clientName: "Robert Paul Raise",
  },
];

function Projects() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button>All Projects</Button>
          <Button>Completed</Button>
          <Button>Ongoing</Button>
          <Button>Upcoming</Button>
        </div>

        <div className="flex items-center gap-2">
          <Button>Name</Button>
          <Button>New Project</Button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-3">
        {projects.map((project) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
