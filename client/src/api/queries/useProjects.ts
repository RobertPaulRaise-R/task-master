import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getProjects } from "../services/projectApi";

export function useProjects() {
    const workspace = useSelector((state: RootState) => state.workspace);

    const {
        isPending,
        error,
        isError,
        data: projects,
    } = useQuery({
        queryKey: ["projects"],
        queryFn: () => getProjects(workspace._id),
    });

    return { isPending, error, isError, projects };
}
