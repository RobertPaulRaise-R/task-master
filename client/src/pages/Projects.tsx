import { useEffect, useState } from "react";
import ProjectCard from "../features/projects/ProjectCard";
import Button from "../ui/Button";
import ModalView from "../ui/ModalView";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../services/projectApi";
import { useProjects } from "../features/projects/useProjects";
import Spinner from "../ui/Spinner";
import { ProjectI } from "../types";

function Projects() {
  const { projects: projectsData, error, isPending } = useProjects();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projects, setProjects] = useState<ProjectI[]>(projectsData || []);

  useEffect(() => {
    if (projectsData) {
      console.log(projectsData);
      setProjects(projectsData);
    }
  }, [projectsData]);

  const createProjectMutation = useMutation({
    mutationFn: (data: { name: string; description: string }) =>
      createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      setShowProjectForm(false);
      reset();
    },
    onError: (error) => {
      console.error("Error creating project:", error);
    },
  });

  const onSubmit = (data: { name: string; description: string }) => {
    createProjectMutation.mutate({
      name: data.name,
      description: data.description,
    });
  };

  if (isPending) return <Spinner size={20} />;

  if (error) return <p>Error Loading Projects!</p>;

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
            <Input {...register("name", { required: true })} />
          </FormRow>

          <FormRow>
            <span>Project Description</span>
            <Input {...register("description", { required: true })} />
          </FormRow>

          <button type="submit" className="bg-brand-600 py-2">
            Create Project
          </button>
        </form>
      </ModalView>

      {projects.length > 0 ? (
        <div className="mt-5 grid grid-cols-4 gap-3">
          {projects.map((project) => (
            <ProjectCard project={project} />
          ))}
        </div>
      ) : (
        <div className="mt-5 flex h-full w-full items-center justify-center">
          No Projects Available
        </div>
      )}
    </div>
  );
}

export default Projects;
