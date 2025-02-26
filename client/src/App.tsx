import { Outlet } from "react-router";
import Sidebar from "./ui/Sidebar";
import Navbar from "./ui/Navbar";

function App() {
  return (
    <div className="flex h-screen bg-white text-gray-900">
      <Sidebar />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
