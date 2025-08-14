import { MdDashboard, MdQueryStats, MdTaskAlt } from "react-icons/md";
import Tab from "./Tab";
import TabGroup from "./TabGroup";
import { GrTasks } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";
import { HiMiniChatBubbleLeftEllipsis } from "react-icons/hi2";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";

function Tabs({ isExpanded }: { isExpanded: boolean }) {
    return (
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
                    to="team"
                    label="Team"
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

    );
}

export default Tabs;
