import { NavLink } from "react-router";

type TabProps = { label: string; img?: string; alt?: string; to: string };

function Tab({ label, img, alt, to }: TabProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex gap-5 py-1.5 rounded-md ${
          isActive
            ? "text-gray-800 bg-indigo-100 font-medium"
            : "hover:text-gray-800 hover:bg-[#f5f9ff]"
        }`
      }
    >
      <img src={img} alt={alt} />
      <span>{label}</span>
    </NavLink>
  );
}

export default Tab;
