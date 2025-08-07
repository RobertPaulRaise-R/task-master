import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../services/projectApi";
import { ProjectI } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ProjectsResponse {
    data: ProjectI[];
}

export function useProjects() {

    const workspace = useSelector((state: RootState) => state.workspace);

    const {
        isPending,
        error,
        isError,
        data,
    } = useQuery<ProjectsResponse>({
        queryKey: ["projects"],
        queryFn: () => getProjects(workspace._id),
    });

    const projects = data?.data || [];

    return { isPending, error, isError, projects };
}
