import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
    //const { isAuth, isPending, isError } = useAuth();

    //if (isPending) return <p>Authenticating</p>

    //if (isError) return <Navigate to={"/login"} replace />

    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) {
        return <div>Loading...</div>; // or a spinner
    }

    return isSignedIn ? <Outlet /> : <Navigate to={"/login"} replace />
}

export default ProtectedRoute;
