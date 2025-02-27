import { BsDash } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { useLocation } from "react-router";
import SearchBar from "./SearchBar";

function Navbar() {
  const url = useLocation();
  const pageName = url.pathname.slice(5);

  return (
    <nav className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-stone-600 uppercase font-bold text-md">
          {pageName}
        </h2>
        <div className="flex items-center gap-3">
          <SearchBar />
          <BsDash />
          <CiSettings size={28} />
          <CgProfile size={28} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
