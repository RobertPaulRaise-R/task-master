import { ReactNode } from "react";
import { NavLink } from "react-router";

type TabProps = { label: string; icon: ReactNode; to: string };

function Tab({ label, icon, to }: TabProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-2 py-1 rounded-md ${
          isActive
            ? "text-stone-800 bg-white font-medium shadow-sm"
            : "hover:text-gray-800 hover:bg-stone-300"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

export default Tab;
