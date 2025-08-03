import Tab from "./Tab";
import TabGroup from "./TabGroup";

import { GrTasks } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";
import { HiMiniChatBubbleLeftEllipsis } from "react-icons/hi2";
import { MdDashboard, MdQueryStats, MdTaskAlt } from "react-icons/md";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";

function Sidebar({ isExpanded }: { isExpanded: boolean }) {
  return (
    <aside
      className={`dark:bg-neutral-950 dark:text-neutral-400 h-screen w-12 px-2 py-3 border-r border-r-transparent dark:border-r-neutral-700 md:max-w-[200px] lg:max-w-[255px] ${isExpanded ? "w-[220px]" : ""}`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-md font-bold">
          <span className="bg-light-900 text-light-100 mr-2 px-2 py-1">T</span>
          {isExpanded ? <span>Task Master</span> : null}
        </h1>
      </div>

      <div className="flex flex-col">
        <TabGroup>
          <Tab
            isExpanded={isExpanded}
            to="dashboard"
            label="Dashboard"
            icon={<MdDashboard size={20} />}
          />
          <Tab
            isExpanded={isExpanded}
            to="tasks"
            label="Tasks"
            icon={<MdTaskAlt size={20} />}
          />
          <Tab
            isExpanded={isExpanded}
            to="projects"
            label="Projects"
            icon={<GrTasks size={20} />}
          />
        </TabGroup>

        <TabGroup>
          <Tab
            isExpanded={isExpanded}
            to="people"
            label="People"
            icon={<RiTeamFill size={20} />}
          />
          <Tab
            isExpanded={isExpanded}
            to="chat"
            label="Chat"
            icon={<HiMiniChatBubbleLeftEllipsis size={20} />}
          />
        </TabGroup>

        <TabGroup>
          <Tab
            isExpanded={isExpanded}
            to="calendar"
            label="Calendar"
            icon={<IoCalendarNumberSharp size={20} />}
          />
          <Tab
            isExpanded={isExpanded}
            to="timeline"
            label="Timeline"
            icon={<MdQueryStats size={20} />}
          />
          <Tab
            isExpanded={isExpanded}
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
