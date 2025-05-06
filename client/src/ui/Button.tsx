import { ReactNode } from "react";

function Button({
  children,
  onClick,
  type,
  disabled,
  bgColor = "bg-brand-500",
  textColor = "text-black",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  bgColor?: string;
  textColor?: string;
  className?: string;
}) {
  return (
    <button
      className={`hover:bg-brand-400 active:bg-brand-600 cursor-pointer rounded-sm px-4 py-1.5 hover:shadow-lg ${bgColor} ${textColor} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
