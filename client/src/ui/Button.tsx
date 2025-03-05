import { ReactNode } from "react";

function Button({
  children,
  onClick,
  bgColor = "bg-brand-500",
  textColor = "text-black",
}: {
  children: ReactNode;
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
}) {
  return (
    <button
      className={`hover:bg-brand-400 active:bg-brand-600 cursor-pointer rounded-sm px-4 py-1.5 hover:shadow-lg ${bgColor} ${textColor}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
