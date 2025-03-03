import { ReactNode } from "react";

interface IconButtonType {
  children: ReactNode;
  bgColor?: string;
}

function IconButton({ children, bgColor = "bg-light-50" }: IconButtonType) {
  return (
    <button
      className={`hover:border-light-400 max-w-10 rounded-md border border-white p-1 hover:cursor-pointer ${bgColor}`}
    >
      {children}
    </button>
  );
}

export default IconButton;
