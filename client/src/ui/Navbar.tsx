import { BsDash } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { useLocation } from "react-router";

function Navbar() {
  const url = useLocation();
  const pageName = url.pathname.slice(5);

  return (
    <nav className="p-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-stone-600 uppercase font-bold text-md">
          {pageName}
        </h2>
        <div className="flex items-center gap-3">
          <input type="text" className="border" />
          <BsDash />
          <CiSettings size={28} />
          <CgProfile size={28} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
