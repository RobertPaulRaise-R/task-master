import { useLocation, useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import { BiBell } from "react-icons/bi";

import SearchBar from "./SearchBar";
import IconButton from "./IconButton";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import DropdownMenu, { DropdownMenuItem } from "./DropdownMenu";
import { PiSignOutBold } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/userApi";

function Navbar({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: (e) => void;
}) {
  const navigate = useNavigate();
  const url = useLocation();
  const pageName = url.pathname.slice(5);

  const { mutate } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleLogout = () => {
    mutate();
  };

  const userMenuItems: DropdownMenuItem[] = [
    {
      label: "Profile",
      icon: <MdPerson />,
      onClick: () => navigate("/app/profile"),
    },
    {
      label: "Settings",
      icon: <IoMdSettings />,
      onClick: () => navigate("/app/settings"),
    },
    {
      label: "Logout",
      icon: <PiSignOutBold />,
      onClick: handleLogout,
    },
  ];

  return (
    <nav className="bg-light-50 sticky top-0 z-50 w-full px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="hover:bg-light-300 mt-auto rounded-full p-2"
            onClick={() => setIsExpanded((e) => !e)}
          >
            {isExpanded ? <FaAnglesLeft size={16} /> : <FaAnglesRight />}
          </button>
          <h2 className="text-brand-500 text-md font-bold uppercase">
            {pageName}
          </h2>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="hidden md:inline-block">
            <SearchBar label="search anything" />
          </div>

          <DropdownMenu
            items={userMenuItems}
            triggerElement={
              <IconButton>
                <BiBell size={24} />
              </IconButton>
            }
            placement="right"
          />

          <DropdownMenu
            items={userMenuItems}
            triggerElement={
              <IconButton>
                <CgProfile size={24} />
              </IconButton>
            }
            placement="right"
          />
        </div>

        <button className="hover:bg-brand-200 rounded-2xl p-2 lg:hidden">
          <RxHamburgerMenu />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
