import { Component } from "react";
import CalendarDays from "./CalendarDays";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

// Define TaskData and DailyTasks types (can be in a separate types.ts file)
export interface TaskData {
  completed: number;
  total: number;
}

export interface DailyTasks {
  [dateString: string]: TaskData; // e.g., "2025-05-28": { completed: 3, total: 5 }
}

// DayType is primarily used by CalendarDays, but defined here for prop validation
export interface DayType {
  currentMonth: boolean;
  date: Date;
  month: number;
  number: number;
  selected: boolean;
  year: number;
  taskInfo?: TaskData;
}

interface CalendarViewState {
  currentDisplayDate: Date; // This date's month and year are displayed
  dailyTasks: DailyTasks;
}

// Helper to format date as YYYY-MM-DD for task keys
const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // JS months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// MOCK TASK DATA - In a real app, this would come from props, context, or an API call
const MOCK_DAILY_TASKS: DailyTasks = {
  [formatDateKey(new Date(new Date().getFullYear(), new Date().getMonth(), 1))]:
    { completed: 5, total: 5 },
  [formatDateKey(new Date(new Date().getFullYear(), new Date().getMonth(), 8))]:
    { completed: 2, total: 5 },
  [formatDateKey(
    new Date(new Date().getFullYear(), new Date().getMonth(), 15),
  )]: { completed: 1, total: 4 },
  [formatDateKey(
    new Date(new Date().getFullYear(), new Date().getMonth(), 20),
  )]: { completed: 0, total: 3 },
  [formatDateKey(
    new Date(new Date().getFullYear(), new Date().getMonth(), 22),
  )]: { completed: 3, total: 3 },
  [formatDateKey(
    new Date(new Date().getFullYear(), new Date().getMonth() - 1, 28),
  )]: { completed: 2, total: 2 }, // Prev month
  [formatDateKey(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 2),
  )]: { completed: 1, total: 1 }, // Next month
  // For real 'today'
  [formatDateKey(new Date())]: {
    completed: Math.floor(Math.random() * 4),
    total: Math.floor(Math.random() * 3) + 3,
  },
};

export default class CalendarView extends Component<{}, CalendarViewState> {
  weekdays: string[];
  months: string[];

  constructor(props: {}) {
    super(props);

    this.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.state = {
      currentDisplayDate: new Date(),
      dailyTasks: MOCK_DAILY_TASKS,
    };
  }

  // Placeholder for fetching tasks if you were to implement API calls
  // componentDidMount() { this.fetchTasksForMonth(this.state.currentDisplayDate); }
  // componentDidUpdate(prevProps: {}, prevState: CalendarViewState) {
  //   if (prevState.currentDisplayDate.getMonth() !== this.state.currentDisplayDate.getMonth() ||
  //       prevState.currentDisplayDate.getFullYear() !== this.state.currentDisplayDate.getFullYear()) {
  //     this.fetchTasksForMonth(this.state.currentDisplayDate);
  //   }
  // }
  // fetchTasksForMonth = (date: Date) => {
  //   console.log("Fetching tasks for month:", this.months[date.getMonth()], date.getFullYear());
  //   // Example:
  //   // api.getTasks(date.getFullYear(), date.getMonth() + 1).then(tasks => this.setState({ dailyTasks: tasks }));
  // }

  changeSelectedDate = (day: DayType) => {
    this.setState({
      currentDisplayDate: new Date(day.year, day.month, day.number),
    });
  };

  prevMonth = () => {
    this.setState((prevState) => ({
      currentDisplayDate: new Date(
        prevState.currentDisplayDate.getFullYear(),
        prevState.currentDisplayDate.getMonth() - 1,
        1, // Set to 1st of month to prevent issues with day numbers (e.g. March 31 -> Feb "31")
      ),
    }));
  };

  nextMonth = () => {
    this.setState((prevState) => ({
      currentDisplayDate: new Date(
        prevState.currentDisplayDate.getFullYear(),
        prevState.currentDisplayDate.getMonth() + 1,
        1,
      ),
    }));
  };

  render() {
    const { currentDisplayDate, dailyTasks } = this.state;
    return (
      <div className="flex h-full w-full flex-col rounded-lg bg-gray-50 p-2 shadow-lg sm:p-4 dark:bg-gray-900">
        <div className="flex items-center justify-between rounded-t-md border-b border-gray-200 bg-white px-4 py-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <BiLeftArrowAlt
            className="cursor-pointer text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            size={24}
            onClick={this.prevMonth}
            aria-label="Previous month"
          />
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
            {this.months[currentDisplayDate.getMonth()]}{" "}
            {currentDisplayDate.getFullYear()}
          </h2>
          <BiRightArrowAlt
            className="cursor-pointer text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            size={24}
            onClick={this.nextMonth}
            aria-label="Next month"
          />
        </div>

        <div className="grid grid-cols-7 bg-gray-100 dark:bg-gray-700">
          {this.weekdays.map((weekday) => (
            <div
              key={weekday}
              className="border-b border-l border-gray-200 py-2 text-center last:border-r dark:border-gray-600"
            >
              <p className="text-xs font-medium text-gray-500 uppercase sm:text-sm dark:text-gray-300">
                {weekday}
              </p>
            </div>
          ))}
        </div>

        <div className="flex-grow">
          {" "}
          {/* Allows CalendarDays to fill available vertical space */}
          <CalendarDays
            displayDate={currentDisplayDate}
            selectedDate={currentDisplayDate} // The day that is currently "active" or "focused"
            onClick={this.changeSelectedDate}
            dailyTasks={dailyTasks}
            todayActual={new Date()} // Pass the actual current date for highlighting "today"
          />
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-b-md border-t border-gray-200 bg-white p-2 text-xs sm:mt-4 sm:justify-start sm:p-3 dark:border-gray-700 dark:bg-gray-800">
          <span className="mr-2 font-semibold text-gray-700 dark:text-gray-200">
            Legend:
          </span>
          <div className="flex items-center">
            <span className="mr-1 h-3 w-3 rounded-sm border border-green-400 bg-green-300 dark:border-green-500 dark:bg-green-600"></span>
            <span className="text-gray-600 dark:text-gray-300">
              Good (&ge;75%)
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 h-3 w-3 rounded-sm border border-yellow-400 bg-yellow-300 dark:border-yellow-500 dark:bg-yellow-600"></span>
            <span className="text-gray-600 dark:text-gray-300">
              Average (40-74%)
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 h-3 w-3 rounded-sm border border-red-400 bg-red-300 dark:border-red-500 dark:bg-red-600"></span>
            <span className="text-gray-600 dark:text-gray-300">
              Bad (&lt;40%)
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 h-3 w-3 rounded-sm border border-gray-300 bg-gray-100 dark:border-gray-500 dark:bg-gray-700"></span>
            <span className="text-gray-600 dark:text-gray-300">
              No Tasks / Other Month
            </span>
          </div>
        </div>
      </div>
    );
  }
}
