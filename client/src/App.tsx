import { Outlet } from "react-router";
import Sidebar from "./ui/Sidebar";
import Navbar from "./ui/Navbar";

function App() {
  return (
    <div className=" bg-brand-200 flex h-screen">
      <Sidebar />
      <div className="w-full m-2 rounded-md shadow-md overflow-auto">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
