import { ReactNode } from "react";

function FormRow({ children }: { children: ReactNode | ReactNode[] }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

export default FormRow;
