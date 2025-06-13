import { ReactNode, RefObject } from "react";

interface IconButtonType {
  children: ReactNode;
  bgColor?: string;
  ref?: RefObject<HTMLButtonElement | null>;
  onClick?: () => void;
  disabled?: boolean;
}

function IconButton({
  children,
  ref,
  onClick,
  disabled,
  bgColor = "bg-light-50",
}: IconButtonType) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={`hover:border-light-400 max-w-10 rounded-md border border-transparent p-1 hover:cursor-pointer ${bgColor}`}
    >
      {children}
    </button>
  );
}

export default IconButton;
