import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import { BiBell } from "react-icons/bi";

import IconButton from "./IconButton";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import DropdownMenu, { DropdownMenuItem } from "./DropdownMenu";
import { PiSignOutBold } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineDarkMode, MdPerson } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { IoSunnyOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import WorkspaceSelector from "../features/workspace/WorkspaceSelector";
import { useWorkspaces } from "../api/queries/useWorkspaces";
import { logoutUser } from "../api/services/userApi";
import { WorkspaceI } from "../types";
import Tabs from "./Tabs";
import Tab from "./Tab";
import TabGroup from "./TabGroup";

function Navbar({
    isExpanded,
    setIsExpanded,
    theme,
    toggleTheme,
}: {
    isExpanded: boolean;
    setIsExpanded: (e: boolean) => void;
    theme: "light" | "dark";
    toggleTheme: () => void;
}) {
    const { workspaces, isPending } = useWorkspaces();

    const navigate = useNavigate();

    const workspaceFromLocalStorage = localStorage.getItem("workspace");

    const [workspace, setWorkspace] = useState<WorkspaceI | null>(workspaceFromLocalStorage ? JSON.parse(workspaceFromLocalStorage) : "");
    const [showMenu, setShowMenu] = useState(false);


    const { mutate } = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            navigate("/");
        },
    });

    const handleLogout = () => {
        mutate();
    };

    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setShowMenu(false);
            }
        }

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

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
        <nav className="bg-light-50 dark:bg-neutral-950 sticky top-0 z-20 w-full px-4 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-3">
                    <button
                        className="hidden lg:flex hover:bg-light-300 hover:dark:bg-neutral-900 size-10 items-center justify-center rounded-full p-2 text-light-800 dark:text-dark-50"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? <FaAnglesLeft size={16} className="block" /> : <FaAnglesRight className="inline-block" />}
                    </button>
                    {/*
                    <h2 className="text-brand-500 text-md font-bold uppercase">
                        {pageName}
                    </h2>
                    */}
                    {!isPending &&
                        <WorkspaceSelector workspaces={workspaces} workspace={workspace} setWorkspace={setWorkspace} />
                    }
                </div>


                <div className="hidden lg:items-center gap-4 lg:flex">
                    <button onClick={toggleTheme}>
                        {theme === "dark" ?
                            (<MdOutlineDarkMode size={20} color="white" />)
                            : (<IoSunnyOutline size={20} color="black" />)
                        }
                    </button>


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

                <div className="lg:hidden">
                    <IconButton onClick={() => setShowMenu(show => !show)}>
                        <RxHamburgerMenu />
                    </IconButton>
                </div>

                {
                    showMenu ?
                        <div ref={menuRef} className="absolute z-50 flex flex-col bg-light-200 dark:bg-neutral-600 w-[250px] h-screen top-0 right-0 px-4 shadow-lg shadow-black/30 rounded-lg">
                            <Tabs isExpanded={isExpanded} />
                            <TabGroup>
                                <Tab
                                    isExpanded={isExpanded}
                                    to="profile"
                                    label="Profile"
                                    icon={<MdPerson size={20} />}
                                />

                                <Tab
                                    isExpanded={isExpanded}
                                    to="settings"
                                    label="Settings"
                                    icon={<IoMdSettings size={20} />}
                                />

                                <Tab
                                    isExpanded={isExpanded}
                                    to="logout"
                                    label="Logout"
                                    icon={<PiSignOutBold size={20} />}
                                />


                            </TabGroup>
                        </div>
                        : null
                }
            </div>
        </nav>
    );
}

export default Navbar;
