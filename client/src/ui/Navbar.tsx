import { useLocation } from "react-router";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { BiBell } from "react-icons/bi";

import SearchBar from "./SearchBar";
import IconButton from "./IconButton";

function Navbar() {
  const url = useLocation();
  const pageName = url.pathname.slice(5);

  return (
    <nav className="bg-light-50 sticky top-0 z-50 w-full px-4 py-3">
      <div className="flex items-center justify-between">
        <h2 className="text-brand-500 text-md font-bold uppercase">
          {pageName}
        </h2>
        <div className="flex items-center gap-4">
          <SearchBar label="search anything" />

          <div className="bg-light-400 ml-2 h-8 w-[1px]"></div>

          <IconButton>
            <BiBell size={24} />
          </IconButton>

          <IconButton>
            <IoSettingsOutline size={24} />
          </IconButton>

          <IconButton>
            <CgProfile size={24} />
          </IconButton>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
