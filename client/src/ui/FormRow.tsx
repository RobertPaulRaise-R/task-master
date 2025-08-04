import { ReactNode } from "react";

function FormRow({ children }: { children: ReactNode | ReactNode[] }) {
  return <div className="mt-3 flex flex-col gap-1.5">{children}</div>;
}

export default FormRow;
