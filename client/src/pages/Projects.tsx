import { useState } from "react";
import ProjectCard from "../features/projects/ProjectCard";
import Button from "../ui/Button";
import ModalView from "../ui/ModalView";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";

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
  const [showProjectForm, setShowProjectForm] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = () => {};

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
          {/* SORTING OPTIONS TO BE IMPLEMENTED */}
          <Button onClick={() => setShowProjectForm(true)}>
            <span>New Project</span>
          </Button>
        </div>
      </div>

      {/* NEW PROJECT FORM */}
      <ModalView
        title="Create New Project"
        isOpen={showProjectForm}
        onClose={() => setShowProjectForm((show) => !show)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FormRow>
            <span>Project Name</span>
            <Input {...register("taskName", { required: true })} />
          </FormRow>

          <FormRow>
            <span>Project Description</span>
            <Input {...register("taskDescription", { required: true })} />
          </FormRow>

          <button type="submit" className="bg-brand-600 py-2">
            Create
          </button>
        </form>
      </ModalView>

      <div className="mt-5 grid grid-cols-4 gap-3">
        {projects.map((project) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
