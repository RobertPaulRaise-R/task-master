import { Navigate, Outlet, useNavigate } from "react-router";
import Sidebar from "./ui/Sidebar";
import Navbar from "./ui/Navbar";
import { useAuth } from "./hooks/useAuth";
import Spinner from "./ui/Spinner";

function App() {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useAuth();

  console.log(data);
  if (isLoading) <Spinner size={20} />;
  if (isError) return navigate("/login");

  return (
    <div className="bg-light-50 flex h-screen">
      <Sidebar />
      <div className="m-2 w-full overflow-auto rounded-md shadow-md">
        <Navbar />
        {data ? <Outlet /> : <Navigate to={"/login"} />}
      </div>
    </div>
  );
}

export default App;
