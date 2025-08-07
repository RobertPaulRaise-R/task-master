import { TeamI } from "../../types";

// Component for a single team row in the timeline
const TeamRow = ({ team, days, firstDay }: { team: TeamI; days: number[]; firstDay: number }) => {
    //const totalColumns = days.length + 1; // +1 for the team name column
    console.log(firstDay);

    return (
        // Use grid for the row layout. Define columns: 1 for team name, rest for days.
        <div
            className="grid items-center border-b border-gray-200 py-2"
            style={{
                gridTemplateColumns: `150px repeat(${days.length}, minmax(40px, 1fr))`,
            }} // Fixed width for team name, flexible for days
        >
            {/* Team Name Column */}
            <div className="px-4 text-sm font-semibold text-gray-600">
                {team.name}
            </div>

            {/* Task Bars Area - spans across all day columns */}
            {/* Use a nested grid specifically for placing tasks accurately */}
            <div
                className="relative col-span-full col-start-2 grid h-full" // Start from the second column, span all day columns
                style={{
                    gridTemplateColumns: `repeat(${days.length}, minmax(40px, 1fr))`,
                }} // Match parent's day columns
            >
                {/* Render each task for the team */}
                {team.tasks.map((t) => (
                    // Pass firstDay for correct column calculation in TaskBar
                    <span>{t}</span>
                    /*<TaskBar key={i} task={task as TaskI} firstDay={firstDay} />*/
                ))}
            </div>
        </div>
    );
};

export default TeamRow;
