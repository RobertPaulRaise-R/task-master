import { ReactElement } from "react";

function TabGroup({ children }: { children: ReactElement[] }) {
  return (
    <div className="flex flex-col gap-1 mt-5">
      {children}
      <span className="h-[1px] w-full bg-light-400 dark:bg-light-600 mt-1"></span>
    </div>
  );
}

export default TabGroup;
