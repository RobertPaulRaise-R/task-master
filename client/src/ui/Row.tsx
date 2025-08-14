import { ReactNode } from "react";

function Row({ children }: { children: ReactNode | ReactNode[] }) {
    return <div className="mt-3 flex flex-col gap-1">{children}</div>;
}

export default Row;
