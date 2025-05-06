import TeamRow from "../features/timeline/TeamRow";
import UserAvatar from "../features/timeline/UserAvatar";

// Sample data simulating the timeline information
const timelineData = {
  // Define the range of days visible in the timeline header
  days: Array.from({ length: 24 }, (_, i) => 5 + i), // Days from 05 to 28
  teams: [
    {
      name: "Development team",
      tasks: [
        {
          id: 1,
          title: "Finance App Exploration",
          startDay: 7,
          endDay: 12,
          progress: "134/5",
          color: "bg-purple-500",
          users: ["U1", "U2", "U3"],
        },
        {
          id: 2,
          title: "Finance App Meetings",
          startDay: 8,
          endDay: 10,
          color: "bg-purple-300",
          users: [],
        },
        {
          id: 3,
          title: "Backend Work",
          startDay: 8,
          endDay: 10,
          color: "bg-purple-300",
          users: [],
        },
        {
          id: 4,
          title: "UX Research",
          startDay: 16,
          endDay: 19,
          progress: "139",
          color: "bg-amber-400",
          users: ["U4"],
        },
      ],
    },
    {
      name: "Design team",
      tasks: [
        {
          id: 4,
          title: "Business App Development",
          startDay: 6,
          endDay: 18,
          progress: "83 22/28",
          color: "bg-red-500",
          users: ["U5", "U6", "U1"],
        },
        {
          id: 5,
          title: "Usability testing",
          startDay: 7,
          endDay: 9,
          color: "bg-gray-400",
          users: [],
        },
        {
          id: 6,
          title: "UX interview",
          startDay: 13,
          endDay: 15,
          color: "bg-gray-400",
          users: [],
        },
      ],
    },
    {
      name: "Marketing team",
      tasks: [
        {
          id: 7,
          title: "Crypto app sales",
          startDay: 7,
          endDay: 10,
          color: "bg-blue-500",
          users: ["U2"],
        },
        {
          id: 8,
          title: "Vacations",
          startDay: 14,
          endDay: 16,
          color: "bg-blue-300",
          users: [],
        },
        {
          id: 9,
          title: "Crypto app sales",
          startDay: 17,
          endDay: 20,
          color: "bg-blue-500",
          users: ["U3"],
        },
        {
          id: 10,
          title: "Developing a marketing campaign for a business application",
          startDay: 18,
          endDay: 26,
          progress: "19",
          color: "bg-blue-500",
          users: ["U4", "U5"],
        },
      ],
    },
  ],
};

// Main Timeline Component
const Timeline = () => {
  const { days, teams } = timelineData;
  const firstDay = days[0]; // Get the starting day number (e.g., 5)
  const totalColumns = days.length + 1; // +1 for the team name column

  return (
    <div className="w-full overflow-x-auto rounded-lg bg-white p-6 shadow-lg">
      {" "}
      {/* Added overflow-x-auto for responsiveness */}
      {/* Header Section */}
      <div className="mb-4">
        <p className="text-xs text-gray-500">Wednesday, 24 June</p>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            Road map product 2021
          </h2>
          {/* Placeholder for buttons/controls */}
          <div className="flex items-center space-x-2">
            <span className="mr-2 text-sm text-gray-600">
              Show: All Projects
            </span>
            {/* Placeholder Avatars in Header */}
            <div className="flex items-center">
              <UserAvatar userId="H1" index={0} />
              <UserAvatar userId="H2" index={1} />
              <UserAvatar userId="H3" index={2} />
              <UserAvatar userId="H4" index={3} />
            </div>
            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add new user
            </button>
            <button className="rounded-md bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700">
              Save
            </button>
          </div>
        </div>
      </div>
      {/* Timeline Grid */}
      <div className="relative">
        {" "}
        {/* Relative container for absolute positioned lines */}
        {/* Date Header Row */}
        <div
          className="sticky top-0 z-20 grid bg-white" // Sticky header
          style={{
            gridTemplateColumns: `150px repeat(${days.length}, minmax(40px, 1fr))`,
          }} // Match TeamRow columns
        >
          {/* Empty cell above team names */}
          <div className="border-b border-gray-200 px-4 py-2"></div>
          {/* Date Cells */}
          {days.map((day) => (
            <div
              key={day}
              className="border-b border-l border-gray-200 py-2 text-center text-xs font-medium text-gray-500"
            >
              {/* Format day with leading zero if needed */}
              {String(day).padStart(2, "0")}
            </div>
          ))}
        </div>
        {/* Vertical Day Lines (drawn behind team rows) */}
        <div
          className="pointer-events-none absolute top-0 right-0 bottom-0 left-[150px] z-0 grid" // Position behind content
          style={{
            gridTemplateColumns: `repeat(${days.length}, minmax(40px, 1fr))`,
          }}
        >
          {/* Skip the first column (team name) */}
          {days.map((day, index) => (
            <div
              key={`line-${day}`}
              className="h-full border-l border-gray-200"
            ></div>
          ))}
        </div>
        {/* Team Rows */}
        <div className="relative z-10">
          {" "}
          {/* Ensure team rows are above the lines */}
          {teams.map((team) => (
            <TeamRow
              key={team.name}
              team={team}
              days={days}
              firstDay={firstDay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Export the main component
export default Timeline;

// Note: To make this fully functional in a React project:
// 1. Ensure you have React and Tailwind CSS set up.
// 2. You might need to configure Tailwind's JIT engine to recognize dynamic classes like `col-start-*` if not using inline styles.
//    Alternatively, using inline `gridColumnStart` and `gridColumnEnd` as shown bypasses this need.
// 3. Replace placeholder avatars and data with your actual data fetching and components.
// 4. Add interactivity (dragging, resizing tasks) if needed, which would require state management and event handlers.
