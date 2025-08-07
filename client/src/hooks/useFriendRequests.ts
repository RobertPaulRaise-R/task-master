import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../services/friendApi";

export const useFriendRequests = () => {
    const {
        data: friendRequests,
        isError,
        error,
        isPending,
    } = useQuery({
        queryKey: ["friendRequests"],
        queryFn: getFriendRequests,
    });

    return { friendRequests, isError, error, isPending };
};
