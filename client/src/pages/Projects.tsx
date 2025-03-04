import Button from "../ui/Button";

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
    </div>
  );
}

export default Projects;
