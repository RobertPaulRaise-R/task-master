import { ReactNode } from "react";

function Col({ children }: { children: ReactNode | ReactNode[] }) {
    return <div className="mt-3 flex gap-1.5">{children}</div>;
};

export default Col;

