import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/userApi";

function useUser() {
    const {data: user, isPending, isError, error} = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });

    return { isPending, isError, error, user };
}

export default useUser;
