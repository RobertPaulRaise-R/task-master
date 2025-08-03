import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../services/friendApi";

export const useFriends = () => {
  const {
    isError,
    error,
    isPending,
    data: friends,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  return { isError, error, isPending, friends };
};
