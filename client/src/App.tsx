import { Navigate, Outlet } from "react-router";
import Sidebar from "./ui/Sidebar";
import Navbar from "./ui/Navbar";
import { useAuth } from "./hooks/useAuth";
import Spinner from "./ui/Spinner";
import { useState } from "react";

function App() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { data, isError, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner size={20} />;
  }

  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-light-50 flex h-screen">
      <Sidebar isExpanded={isExpanded} />
      <div className="m-2 w-full overflow-auto rounded-md shadow-md">
        <Navbar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
