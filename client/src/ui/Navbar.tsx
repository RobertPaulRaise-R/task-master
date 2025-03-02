import { useLocation } from "react-router";
import { CgProfile } from "react-icons/cg";
import { IoNotifications, IoSettings } from "react-icons/io5";

import SearchBar from "./SearchBar";

function Navbar() {
  const url = useLocation();
  const pageName = url.pathname.slice(5);

  return (
    <nav className="sticky top-0 px-4 py-3 w-full z-50">
      <div className="flex items-center justify-between">
        <h2 className="text-stone-600 uppercase font-bold text-md">
          {pageName}
        </h2>
        <div className="flex items-center gap-3">
          <SearchBar />

          <div className="w-[1px] h-8 bg-stone-800 ml-2"></div>

          <IoNotifications size={28} />
          <IoSettings size={28} />
          <CgProfile size={28} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
