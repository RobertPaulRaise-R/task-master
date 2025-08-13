import { useQuery } from "@tanstack/react-query"
import { getWorkspaces } from "../services/worksapceApi";

export const useWorkspaces = () => {
    const { data: workspaces, isPending, isError, error } = useQuery({
        "queryKey": ["workspaces"],
        "queryFn": getWorkspaces,
    });


    return { isPending, isError, error, workspaces };

}
