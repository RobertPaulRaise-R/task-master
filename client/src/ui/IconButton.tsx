import { ReactNode } from "react";

interface IconButtonType {
  children: ReactNode;
  bgColor: string;
}

function IconButton({ children, bgColor }: IconButtonType) {
  return (
    <button className={`p-1 rounded-full hover:cursor-pointer ${bgColor}`}>
      {children}
    </button>
  );
}

export default IconButton;
