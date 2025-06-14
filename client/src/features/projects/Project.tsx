import { useEffect, useState } from "react";
import { useProjectById } from "./useProjectById";
import { ProjectI } from "../../types";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import TeamCard from "./TeamCard";
import ModalView from "../../ui/ModalView";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useMutation } from "@tanstack/react-query";
import { createTeam } from "../../services/teamApi";

function Project() {
  const [project, setProject] = useState<ProjectI | null>(null);
  const { project: projectData, isPending, error } = useProjectById();

  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (projectData) {
      console.log(projectData);
      setProject(projectData);
    }
  }, [projectData]);

  const createTeamMutation = useMutation({
    mutationFn: (data: { name: string; project: string | undefined }) =>
      createTeam(data),
    onSuccess: () => {
      setShowTeamForm(false);
      reset();
    },
    onError: (error: any) => {
      console.error("Team creation failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create team";
      alert(errorMessage);
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: (data: { name: string; project: string | undefined }) =>
      createTeam(data),
    onSuccess: () => {
      setShowTeamForm(false);
      reset();
    },
    onError: (error: any) => {
      console.error("Team creation failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create team";
      alert(errorMessage);
    },
  });

  const onCreateTeamSubmit = (data: { name: string }) => {
    createTeamMutation.mutate({ ...data, project: project?._id });
  };

  const onCreateTaskSubmit = (data: { name: string }) => {
    createTaskMutation.mutate({ ...data, project: project?._id });
  };

  if (isPending) return <Spinner size={20} />;

  if (error) return <p>Project Details not available</p>;

  if (!project) return <p>Loading project details...</p>;

  return (
    <div className="m-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-brand-800 text-2xl font-semibold">
            {project.name}
          </h1>
          <p className="text-light-800">{project.description}</p>
        </div>
        <Button>Edit</Button>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-brand-800 text-xl font-medium">Tasks</h2>
          <Button onClick={() => setShowTaskForm(true)}>New Task</Button>
        </div>

        <ModalView
          title="Create New Task"
          isOpen={showTaskForm}
          onClose={() => setShowTaskForm((show) => !show)}
        >
          <form
            onSubmit={handleSubmit(onCreateTaskSubmit)}
            className="flex flex-col gap-5"
          >
            <FormRow>
              <label className="text-light-600">Task Name</label>
              <Input
                {...register("taskName", { required: true })}
                placeholder="Create a doom game in typescript"
              />
            </FormRow>

            <FormRow>
              <label className="text-light-600">Task Description</label>
              <Input
                {...register("taskDescription", { required: true })}
                placeholder="Create a react typescript project and express as the backend and use sql lite for database"
              />
            </FormRow>

            <FormRow>
              <label className="text-light-600">Assign To</label>
              <select
                className="border-light-800 rounded-sm border px-4 py-2"
                {...register("taskPriority", { required: true })}
              >
                {project.members && project.members.length > 0
                  ? project.members.map((member, i) => (
                      <option value={member.name} key={i}>
                        {member.name}
                      </option>
                    ))
                  : null}
              </select>
            </FormRow>

            <FormRow>
              <label className="text-light-600">Task Priority</label>
              <select
                className="border-light-800 rounded-sm border px-4 py-2"
                {...register("taskPriority", { required: true })}
              >
                <option value={"low"}>Low</option>
                <option value={"medium"}>Medium</option>
                <option value={"high"}>High</option>
              </select>
            </FormRow>

            <FormRow>
              <label className="text-light-600">Task Due Date</label>
              <Input
                type="date"
                {...register("taskDueDate", { required: true })}
              />
            </FormRow>

            <button type="submit" className="bg-brand-600 py-2">
              Create
            </button>
          </form>
        </ModalView>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-brand-800 text-xl font-medium">Teams</h2>
          <Button onClick={() => setShowTeamForm((show) => !show)}>
            New Team
          </Button>

          <ModalView
            title="Create New Project"
            isOpen={showTeamForm}
            onClose={() => setShowTeamForm(true)}
          >
            <form
              onSubmit={handleSubmit(onCreateTeamSubmit)}
              className="flex flex-col gap-5"
            >
              <FormRow>
                <span>Team Name</span>
                <Input {...register("name", { required: true })} />
              </FormRow>

              <button type="submit" className="bg-brand-600 py-2">
                Create Team
              </button>
            </form>
          </ModalView>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {project.teams && project.teams.length > 0 ? (
            project.teams.map((team) => (
              <div key={team._id}>
                <TeamCard team={team} />
              </div>
            ))
          ) : (
            <p>No team found for this project</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Project;
