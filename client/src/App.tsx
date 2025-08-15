import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router";
import Sidebar from "./ui/Sidebar";
import Navbar from "./ui/Navbar";
import { useState } from "react";
import { useTheme } from "./context/ThemeContext";

function App() {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const { theme, toggleTheme } = useTheme();

    return (
        <div className="bg-light-50 dark:bg-neutral-950 text-gray-900 dark:text-white flex h-screen custom-scrollbar">
            <Sidebar isExpanded={isExpanded} />
            <div className="m-2 w-full overflow-auto rounded-md shadow-md">
                <Navbar isExpanded={isExpanded} setIsExpanded={setIsExpanded} theme={theme} toggleTheme={toggleTheme} />
                <Outlet />
            </div>

            <Toaster position="bottom-right" reverseOrder={false}/>
        </div>
    );
}

export default App;
