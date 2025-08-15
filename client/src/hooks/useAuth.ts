import { useQuery } from "@tanstack/react-query";
import { auth } from "../api/services/userApi";

export const useAuth = () => {
    const { data: isAuth, isPending, isError, error } = useQuery({
        queryKey: ["me"],
        queryFn: auth,
        retry: false,
    });

    return { isAuth, isPending, isError, error };
};
