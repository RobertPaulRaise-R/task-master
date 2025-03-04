import { ReactNode } from "react";

function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className="bg-light-900 text-light-100 cursor-pointer rounded-sm px-4 py-1.5 hover:bg-stone-800 hover:shadow-lg"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
