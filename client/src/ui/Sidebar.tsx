import { useTheme } from "../context/ThemeContext";
import Tab from "./Tab";
import TabGroup from "./TabGroup";

// Core: Dashboard, Tasks, Projects.
// Team: Teams, Activity, Chat.
// Planning: Calendar, Timeline, Analytics.
// Utils: Settings, Notifications, Archive, Templates.
// Stretch: Goals, Files, Integrations.

function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  console.log(theme);

  return (
    <aside className="px-5 py-3 max-w-60 border-gray-400 border-r h-screen">
      <div className="flex items-center justify-between">
        <img src="" alt="" />
        <h1 className="text-md font-bold">Seven Tasks</h1>

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
          <Tab to="dashboard" label="Dashboard" />
          <Tab to="tasks" label="Tasks" />
          <Tab to="projects" label="Projects" />
        </TabGroup>

        <TabGroup>
          <Tab to="teams" label="Teams" />
          <Tab to="activity" label="Activity" />
          <Tab to="chat" label="Chat" />
        </TabGroup>

        <TabGroup>
          <Tab to="calendar" label="Calendar" />
          <Tab to="timeline" label="Timeline" />
          <Tab to="analytics" label="Analytics" />
        </TabGroup>

        <TabGroup>
          <Tab to="settings" label="Settings" />
          <Tab to="notification" label="Notification" />
          <Tab to="archives" label="Archives" />
        </TabGroup>
      </div>
    </aside>
  );
}

export default Sidebar;
