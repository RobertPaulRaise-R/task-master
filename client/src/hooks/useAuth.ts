import { useQuery } from "@tanstack/react-query";
import { auth } from "../api/services/userApi";

export const useAuth = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["me"],
        queryFn: auth,
        retry: false,
    });

    return { data, isLoading, isError, error };
};
