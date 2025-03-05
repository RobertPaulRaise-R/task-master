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
            ? "bg-brand-600 border-brand-300 text-brand-100 border font-medium shadow-sm"
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
