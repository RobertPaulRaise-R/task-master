import React, { useEffect, useRef, ReactNode } from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

const ModalView: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="bg-light-200/25 fixed inset-0 z-50 flex items-center justify-center rounded-lg shadow-2xl backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
      >
        <button
          className="hover:bg-light-300 absolute top-2 right-2 rounded-sm bg-none p-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <IoClose size={20} />
        </button>

        {title && (
          <h2 className="text-brand-600 mb-4 text-xl font-semibold">{title}</h2>
        )}

        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default ModalView;
