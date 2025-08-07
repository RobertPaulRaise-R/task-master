import { useState } from "react";
import ProjectCard from "../features/projects/ProjectCard";
import Button from "../ui/Button";
import ModalView from "../ui/ModalView";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../services/projectApi";
import { useProjects } from "../features/projects/useProjects";
import Spinner from "../ui/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Label from "../ui/Label";

function Projects() {
    const workspace = useSelector((state: RootState) => state.workspace);

    const { projects, error, isPending } = useProjects();

    const [showProjectForm, setShowProjectForm] = useState(false);

    const { register, handleSubmit, reset } = useForm<{ name: string, description: string }>();

    const queryClient = useQueryClient();
    const createProjectMutation = useMutation({
        mutationFn: (data: { name: string; description: string; workspaceId: string }) => createProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"] as InvalidateQueryFilters);
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
            workspaceId: workspace._id,
        });
    };


    if (isPending) return <Spinner size={20} />;
    if (error) return <p>Error Loading Projects!</p>;

    return (
        <div className="p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button btn="secondary">All Projects</Button>
                    <Button btn="secondary">Completed</Button>
                </div>

                <div className="flex items-center gap-2">
                    {/* SORTING OPTIONS TO BE IMPLEMENTED */}
                    <Button btn="primary" onClick={() => setShowProjectForm(true)}>
                        <span>New Project</span>
                    </Button>
                </div>
            </div>

            {/* NEW PROJECT FORM */}
            <ModalView
                title="Create New Project"
                isOpen={showProjectForm}
                onClose={() => setShowProjectForm(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <FormRow>
                        <Label label="Project Name" />
                        <Input {...register("name", { required: true })} />
                    </FormRow>

                    <FormRow>
                        <Label label="Project Description" />
                        <Input {...register("description", { required: true })} />
                    </FormRow>

                    <div className="flex items-center justify-end gap-3">
                        <Button btn="secondary" onClick={() => setShowProjectForm(false)}>Cancel</Button>
                        <Button btn="primary" type="submit">Create</Button>
                    </div>
                </form>
            </ModalView>

            {!isPending && projects && Array.isArray(projects) && projects.length > 0 ? (
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
