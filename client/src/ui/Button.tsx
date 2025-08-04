import { ReactNode } from "react";

function Button({
  children,
  onClick,
  type,
  btn,
  disabled,
  bgColor = "bg-brand-500",
  textColor = "text-black",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  btn: "primary" | "secondary" | "success" | "danger";
  disabled?: boolean;
  bgColor?: string;
  textColor?: string;
  className?: string;
}) {
      const btnClass = btn === "primary" ? "bg-brand-500 hover:bg-brand-400 active:bg-brand-600"
                        : btn === "secondary" ? "bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-800" 
                        : btn === "success" ? "bg-green-500" 
                        : btn === "danger" ? "bg-red-500" : "";

  return (
    <button
      className={`text-white cursor-pointer rounded-md px-4 py-2 hover:shadow-lg ${btnClass} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
