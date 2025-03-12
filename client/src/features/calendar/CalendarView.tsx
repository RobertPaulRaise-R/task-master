import { Component } from "react";
import CalendarDays from "./CalendarDays";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

export interface DayType {
  currentMonth: boolean;
  date: Date;
  month: number;
  number: number;
  selected: boolean;
  year: number;
}

export default class CalendarView extends Component {
  weekdays: string[];
  months: string[];

  constructor() {
    super();

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
      currentDay: new Date(),
    };
  }

  changeCurrentDay = (day: DayType) => {
    this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  };

  render() {
    return (
      <div className="h-full w-full p-4">
        <div className="bg-light-200 flex items-center justify-between px-4 py-3 text-center">
          <BiLeftArrow className="hover:text-light-700" size={20} />
          <h2>
            {this.months[this.state.currentDay.getMonth()]}{" "}
            {this.state.currentDay.getFullYear()}
          </h2>
          <BiRightArrow className="hover:text-light-700" size={20} />
        </div>
        <div className="">
          <div className="grid grid-cols-7">
            {this.weekdays.map((weekday) => {
              return (
                <div className="border-light-300 border-b border-l py-2 text-center last:border-r">
                  <p>{weekday}</p>
                </div>
              );
            })}
          </div>
          <div className="h-full">
            <CalendarDays
              curDay={this.state.currentDay}
              onClick={this.changeCurrentDay}
            />
          </div>
        </div>
      </div>
    );
  }
}
