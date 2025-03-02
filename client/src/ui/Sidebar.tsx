import { useTheme } from "../context/ThemeContext";
import Tab from "./Tab";
import TabGroup from "./TabGroup";

import { GrAction, GrTasks } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";
import {
  HiArchiveBoxXMark,
  HiMiniChatBubbleLeftEllipsis,
} from "react-icons/hi2";
import { MdDashboard, MdQueryStats, MdTaskAlt } from "react-icons/md";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";

// Core: Dashboard, Tasks, Projects.
// Team: Teams, Activity, Chat.
// Planning: Calendar, Timeline, Analytics.
// Utils: Settings, Notifications, Archive, Templates.
// Stretch: Goals, Files, Integrations.

function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  console.log(theme);

  return (
    <aside className="px-5 py-3 max-w-60 h-screen">
      <div className="flex items-center justify-between">
        <img src="" alt="" />
        <h1 className="text-md font-bold">Taskters</h1>

        <div className="p-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
              className="hidden"
            />
            <div
              className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${
                theme === "dark" ? "bg-primary" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  theme === "dark" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </div>
          </label>
        </div>
      </div>

      <div className="flex flex-col">
        <TabGroup>
          <Tab to="dashboard" label="Dashboard" icon={<MdDashboard />} />
          <Tab to="tasks" label="Tasks" icon={<MdTaskAlt />} />
          <Tab to="projects" label="Projects" icon={<GrTasks />} />
          <Tab to="archives" label="Archives" icon={<HiArchiveBoxXMark />} />
        </TabGroup>

        <TabGroup>
          <Tab to="teams" label="Teams" icon={<RiTeamFill />} />
          <Tab to="activity" label="Activity" icon={<GrAction />} />
          <Tab to="chat" label="Chat" icon={<HiMiniChatBubbleLeftEllipsis />} />
        </TabGroup>

        <TabGroup>
          <Tab
            to="calendar"
            label="Calendar"
            icon={<IoCalendarNumberSharp />}
          />
          <Tab to="timeline" label="Timeline" icon={<MdQueryStats />} />
          <Tab to="analytics" label="Analytics" icon={<SiGoogleanalytics />} />
        </TabGroup>
      </div>
    </aside>
  );
}

export default Sidebar;
