import { ReactNode } from "react";
import { NavLink } from "react-router";

type TabProps = { label: string; icon: ReactNode; to: string };

function Tab({ label, icon, to }: TabProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md px-2 py-1 ${
          isActive
            ? "bg-light-100 border-light-300 border font-medium text-stone-800 shadow-sm"
            : "hover:bg-light-100 hover:text-gray-800"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

export default Tab;
