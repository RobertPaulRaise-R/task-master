import { DayType, TaskData, DailyTasks } from "./CalendarView"; // Or from a shared types file

// Helper to format date as YYYY-MM-DD for task keys
const formatDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};

interface CalendarDaysProps {
    displayDate: Date; // Determines the month/year to display
    selectedDate: Date; // The specific date that is currently selected
    onClick: (day: DayType) => void;
    dailyTasks: DailyTasks;
    todayActual: Date; 
}

// Determines the styling for a day cell based on its state and task performance
const getPerformanceStyles = (
    taskData: TaskData | undefined,
    isCurrentMonth: boolean,
): { cellBg: string; dayNumberText: string; taskText: string } => {
    let cellBg =
        "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700";
    let dayNumberText = isCurrentMonth
        ? "text-gray-700 dark:text-gray-200"
        : "text-gray-400 dark:text-gray-500";
        let taskText = "text-gray-500 dark:text-gray-400";

        if (!isCurrentMonth) {
            cellBg =
                "bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-700/50"; // Muted for other months
        } else if (taskData && taskData.total > 0) {
                const percentage = (taskData.completed / taskData.total) * 100;
                if (percentage >= 75) {
                    cellBg =
                        "bg-green-200 dark:bg-green-700 hover:bg-green-300 dark:hover:bg-green-600";
                    dayNumberText = "text-green-800 dark:text-green-100";
                    taskText = "text-green-700 dark:text-green-200";
                } else if (percentage >= 40) {
                    cellBg =
                        "bg-yellow-200 dark:bg-yellow-700 hover:bg-yellow-300 dark:hover:bg-yellow-600";
                    dayNumberText = "text-yellow-800 dark:text-yellow-100";
                    taskText = "text-yellow-700 dark:text-yellow-200";
                } else {
                    // Bad performance or 0 completed
                    cellBg =
                        "bg-red-200 dark:bg-red-700 hover:bg-red-300 dark:hover:bg-red-600";
                    dayNumberText = "text-red-800 dark:text-red-100";
                    taskText = "text-red-700 dark:text-red-200";
                }
            }
            // If current month and no tasks (taskData undefined or total is 0), default white/gray background applies

            return { cellBg, dayNumberText, taskText };
};

function CalendarDays({
    displayDate,
    selectedDate,
    onClick,
    dailyTasks,
    todayActual,
}: CalendarDaysProps) {

    const firstDayOfMonth = new Date(
        displayDate.getFullYear(),
        displayDate.getMonth(),
        1,
    );
    
    const lastDayOfMonth = new Date(
        displayDate.getFullYear(),
        displayDate.getMonth() + 1,
        1,
    );

    const weekdayOfFirstDay = firstDayOfMonth.getDay();
    const daysInGrid: DayType[] = [];

    const dayIterator = new Date(firstDayOfMonth);
    dayIterator.setDate(firstDayOfMonth.getDate() - weekdayOfFirstDay); // Start from the Sunday of the week the 1st day falls into

    const endDate = new Date(lastDayOfMonth);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    while (dayIterator <= endDate) {
        // 6 weeks * 7 days = 42 cells
        const currentDateInLoop = new Date(dayIterator);
        const dateKey = formatDateKey(currentDateInLoop);
        const taskInfoForDay = dailyTasks[dateKey];

        daysInGrid.push({
            currentMonth: currentDateInLoop.getMonth() === displayDate.getMonth(),
            date: currentDateInLoop,
            month: currentDateInLoop.getMonth(),
            number: currentDateInLoop.getDate(),
            selected:
                currentDateInLoop.toDateString() === selectedDate.toDateString(),
            year: currentDateInLoop.getFullYear(),
            taskInfo: taskInfoForDay,
        });
        dayIterator.setDate(dayIterator.getDate() + 1);
    }

        return (
            <div className="grid h-full grid-cols-7 grid-rows-6 border-r border-gray-200 dark:border-gray-600">
            {daysInGrid.map((day) => {
                const isToday = day.date.toDateString() === todayActual.toDateString();
                const styles = getPerformanceStyles(day.taskInfo, day.currentMonth);

                let cellClasses = `
                relative p-1.5 sm:p-2 border-b border-l border-gray-200 dark:border-gray-600
                flex flex-col justify-start items-center cursor-pointer
                min-h-[6rem] sm:min-h-[7rem] group transition-colors duration-150
                ${styles.cellBg}
                `;

                if (day.selected) {
                    cellClasses +=
                        " ring-2 ring-blue-500 dark:ring-blue-400 ring-inset z-10";
                } else if (isToday && day.currentMonth) {
                    cellClasses +=
                        " relative after:content-[''] after:absolute after:inset-0 after:border-2 after:border-blue-500 dark:after:border-blue-400 after:rounded-sm";
                }
                if (!day.currentMonth) {
                    cellClasses += " opacity-60 dark:opacity-50";
                }

                return (
                    <div
                    key={day.date.toISOString()}
                    className={cellClasses}
                    onClick={() => onClick(day)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") onClick(day);
                    }}
                    aria-label={`Date ${day.number}${day.month === displayDate.getMonth() ? `, ${styles.cellBg.includes("green") ? "Good day" : styles.cellBg.includes("yellow") ? "Average day" : styles.cellBg.includes("red") ? "Bad day" : day.taskInfo && day.taskInfo.total > 0 ? "Tasks scheduled" : "No tasks"}` : ", other month"}. ${day.taskInfo ? `${day.taskInfo.completed} of ${day.taskInfo.total} tasks completed.` : ""}`}
                    aria-selected={day.selected}
                    >
                    <p
                    className={`self-end text-xs font-medium sm:text-sm ${styles.dayNumberText} ${isToday && day.currentMonth ? "font-bold" : ""}`}
                    >
                    {day.number}
                    </p>
                    {day.currentMonth && day.taskInfo && day.taskInfo.total > 0 && (
                        <div
                        className={`text-xxs mt-auto w-full rounded-sm p-1 text-center font-medium sm:text-xs ${styles.taskText} ${styles.cellBg.includes("green") || styles.cellBg.includes("yellow") || styles.cellBg.includes("red") ? "bg-black/10 dark:bg-white/10" : ""}`}
                        >
                        {day.taskInfo.completed}/{day.taskInfo.total}
                        <span className="hidden sm:inline"> tasks</span>
                        </div>
                    )}
                    {day.currentMonth &&
                        (!day.taskInfo || day.taskInfo.total === 0) && (
                            <div className="text-xxs mt-auto w-full p-1 text-center text-gray-400 italic sm:text-xs dark:text-gray-500">
                            No tasks
                            </div>
                    )}
                    </div>
                );
            })}
            </div>
        );
}

export default CalendarDays;
