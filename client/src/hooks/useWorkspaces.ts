import { useQuery } from "@tanstack/react-query"
import { WorkspaceI } from "../types";
import { getWorkspaces } from "../services/worksapceApi";

interface WorkspaceResult {
    data: WorkspaceI[];
}

export const useWorkspaces = () => {
    const {data , isPending, isError, error} = useQuery<WorkspaceResult>({
        "queryKey": ["workspaces"],
        "queryFn": getWorkspaces, 
    });

    const workspaces = data?.data || [] as WorkspaceI[];

    return { isPending, isError, error, workspaces };

}
