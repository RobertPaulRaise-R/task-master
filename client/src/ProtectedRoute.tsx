import { Navigate, Outlet } from "react-router";
import { useAuth } from "./hooks/useAuth";

function ProtectedRoute() {
    const { isAuth, isPending, isError } = useAuth();

    if (isPending) return <p>Authenticating</p>

    if (isError) return <Navigate to={"/login"} replace />

    return isAuth ? <Outlet /> : <Navigate to={"/login"} replace />
}

export default ProtectedRoute;
