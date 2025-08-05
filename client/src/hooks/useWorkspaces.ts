import { useQuery } from "@tanstack/react-query"
import { WorkspaceI } from "../types";
import { getWorkspaces } from "../services/worksapceApi";

export const useWorkspaces = () => {
    const {data: workspaces, isPending, isError, error} = useQuery<{data: WorkspaceI[]}>({
        "queryKey": ["workspaces"],
        "queryFn": getWorkspaces, 
    });

    return { isPending, isError, error, workspaces };

}
