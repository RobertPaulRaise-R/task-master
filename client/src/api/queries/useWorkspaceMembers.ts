import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getUsersByWorkspace } from "../services/userApi";

export const useWorkspaceMembers = () => {
    const workspace = useSelector((state: RootState) => state.workspace);

    const { data: members, isError, error, isPending } = useQuery({
        queryKey: ["workspaceMembers"],
        queryFn: () => getUsersByWorkspace(workspace._id),
    });

    return { members, isError, error, isPending };
};
