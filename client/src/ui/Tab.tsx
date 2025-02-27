import { NavLink } from "react-router";

type TabProps = { label: string; img?: string; alt?: string; to: string };

function Tab({ label, img, alt, to }: TabProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex gap-5 py-1 rounded-md ${
          isActive
            ? "text-stone-800 bg-white font-medium"
            : "hover:text-gray-800 hover:bg-stone-300"
        }`
      }
    >
      <img src={img} alt={alt} />
      <span>{label}</span>
    </NavLink>
  );
}

export default Tab;
