import { useState } from "react";
import ProjectCard from "../features/projects/ProjectCard";
import Button from "../ui/Button";
import ModalView from "../ui/ModalView";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Label from "../ui/Label";
import { useProjects } from "../api/queries/useProjects";
import { createProject } from "../api/services/projectApi";
import Row from "../ui/Row";

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
                    <Button btn="primary" onClick={() => setShowProjectForm(true)}>
                        <span>New Project</span>
                    </Button>
                </div>
            </div>

            <ModalView
                title="Create New Project"
                isOpen={showProjectForm}
                onClose={() => setShowProjectForm(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <Row>
                        <Label label="Project Name" />
                        <Input placeholder="Enter project name" {...register("name", { required: true })} />
                    </Row>

                    <Row>
                        <Label label="Project Description" />
                        <Input placeholder="Enter project description" {...register("description", { required: true })} />
                    </Row>

                    <div className="flex items-center justify-end gap-3">
                        <Button btn="secondary" onClick={() => setShowProjectForm(false)}>Cancel</Button>
                        <Button btn="primary" type="submit">Create</Button>
                    </div>
                </form>
            </ModalView>

            {!isPending && projects && Array.isArray(projects) && projects.length > 0 ? (
                <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
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
