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
  return (
    <aside className="h-screen max-w-[255px] min-w-52 px-5 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-md font-bold">
          <span className="bg-light-900 text-light-100 mr-2 px-2 py-1">T</span>
          Taskters
        </h1>
      </div>

      <div className="flex flex-col">
        <TabGroup>
          <Tab
            to="dashboard"
            label="Dashboard"
            icon={<MdDashboard size={20} />}
          />
          <Tab to="tasks" label="Tasks" icon={<MdTaskAlt size={20} />} />
          <Tab to="projects" label="Projects" icon={<GrTasks size={20} />} />
          <Tab
            to="archives"
            label="Archives"
            icon={<HiArchiveBoxXMark size={20} />}
          />
        </TabGroup>

        <TabGroup>
          <Tab to="teams" label="Teams" icon={<RiTeamFill size={20} />} />
          <Tab to="activity" label="Activity" icon={<GrAction size={20} />} />
          <Tab
            to="chat"
            label="Chat"
            icon={<HiMiniChatBubbleLeftEllipsis size={20} />}
          />
        </TabGroup>

        <TabGroup>
          <Tab
            to="calendar"
            label="Calendar"
            icon={<IoCalendarNumberSharp size={20} />}
          />
          <Tab
            to="timeline"
            label="Timeline"
            icon={<MdQueryStats size={20} />}
          />
          <Tab
            to="analytics"
            label="Analytics"
            icon={<SiGoogleanalytics size={20} />}
          />
        </TabGroup>
      </div>
    </aside>
  );
}

export default Sidebar;
