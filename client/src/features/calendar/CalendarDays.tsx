import { DayType } from "./CalendarView";

function CalendarDays({
  curDay,
  onClick,
}: {
  curDay: Date;
  onClick: (day: DayType) => void;
}) {
  const firstDayOfMonth = new Date(curDay.getFullYear(), curDay.getMonth(), 1);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  const currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay),
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    const calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === curDay.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === curDay.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  return (
    <div className="border-light-300 grid grid-cols-7 grid-rows-6 border-r">
      {currentDays.map((day) => {
        return (
          <div
            className={
              // "calendar-day" +
              // (day.currentMonth ? " current" : "") +
              // (day.selected ? " selected" : "")
              "border-light-300 relative h-40 border-b border-l"
            }
            onClick={() => onClick(day)}
          >
            <p className="bg-brand-200 absolute right-0 w-7 text-center">
              {day.number}
            </p>
            {/* <span>Task Assigned 3</span> */}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarDays;
