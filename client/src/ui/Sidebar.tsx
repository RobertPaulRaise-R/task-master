import Tabs from "./Tabs";

function Sidebar({ isExpanded }: { isExpanded: boolean }) {
    return (
        <aside
            className={`hidden lg:block dark:bg-neutral-950  dark:text-neutral-400 h-screen w-12 px-2 py-3 border-r border-r-transparent dark:border-r-neutral-700 md:max-w-[200px] lg:max-w-[255px] ${isExpanded ? "w-[220px]" : ""}`}
        >
            <div className="flex items-center justify-between">
                <h2>Taskley</h2>
            </div>


            <Tabs isExpanded={isExpanded} />

        </aside>
    );
}

export default Sidebar;
