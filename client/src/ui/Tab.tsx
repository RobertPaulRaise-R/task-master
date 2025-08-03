import { ReactNode } from "react";
import { NavLink } from "react-router";

type TabProps = {
  label: string;
  icon: ReactNode;
  to: string;
  isExpanded: boolean;
};

function Tab({ label, icon, to, isExpanded }: TabProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md px-2 py-1 ${
          isActive
            ? "bg-brand-600 border-brand-300 text-brand-100 font-bold shadow-sm"
            : "hover:bg-light-100 dark:hover:bg-neutral-900 hover:text-gray-800 dark:hover:text-white"
        }`
      }
    >
      {icon}
      {isExpanded ? <span>{label}</span> : null}
    </NavLink>
  );
}

export default Tab;
