import { ReactElement } from "react";

function TabGroup({ children }: { children: ReactElement[] }) {
  return <div className="flex flex-col gap-1 mt-5">{children}</div>;
}

export default TabGroup;
