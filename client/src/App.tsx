import { Outlet } from "react-router";
import Sidebar from "./ui/Sidebar";
import Navbar from "./ui/Navbar";

function App() {
  return (
    <div className="flex h-screen bg-[#F4F6F6] text-gray-900">
      <Sidebar />
      <div className="bg-white w-full m-2 rounded-md shadow-md overflow-auto">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
