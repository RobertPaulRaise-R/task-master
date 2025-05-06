import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface DropdownMenuItem {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  isSeparator?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string; // Allow custom class names
}

interface DropdownMenuProps {
  items: DropdownMenuItem[];
  triggerElement: React.ReactNode; // The element that triggers the dropdown
  placement?: "top" | "bottom" | "left" | "right"; // Added placement
  offset?: [number, number]; // Added offset
  className?: string; // Added className prop for the dropdown menu
  triggerClassName?: string; // Added className prop for trigger button
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  triggerElement,
  placement = "bottom-start",
  offset = [0, 4], // Default offset
  className,
  triggerClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null); // Ref for the trigger element

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
    console.log("Opening Dropdown menu");
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    console.log("Closing dropdown menu");
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  // Calculate position and alignment
  const getPositionStyles = () => {
    if (!triggerRef.current) {
      return { top: "0px", left: "0px" };
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const containerRect = document.body.getBoundingClientRect(); // Use body for relative positioning
    console.log(triggerRect, containerRect);

    let top: number;
    let left: number;
    let right: number;
    let bottom: number;

    if (placement === "right") {
      top = triggerRect.y + 20;
      right = containerRect.right - triggerRect.right;

      console.log(top, right);

      return {
        top: `${top}px`,
        right: 0,
      };
    }

    // if (placement.startsWith("bottom")) {
    //   top = triggerRect.bottom - containerRect.top + verticalOffset;
    // } else {
    //   // top placement
    //   top =
    //     triggerRect.top -
    //     containerRect.top -
    //     (dropdownRef.current?.offsetHeight || 0) -
    //     verticalOffset;
    // }

    // if (placement.endsWith("start")) {
    //   left = triggerRect.left - containerRect.left + horizontalOffset;
    // } else {
    //   // end placement
    //   left =
    //     triggerRect.right -
    //     containerRect.left -
    //     (dropdownRef.current?.offsetWidth || 0) -
    //     horizontalOffset;
    // }

    // return {
    //   top: `${top}px`,
    //   left: `${left}px`,
    // };
  };

  const positionStyles = isOpen
    ? getPositionStyles()
    : { top: "0px", left: "0px" };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <div
        ref={triggerRef}
        onClick={toggleOpen}
        className="inline-block cursor-pointer"
      >
        {triggerElement}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, ...positionStyles }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            style={positionStyles}
            className={`absolute z-50 min-w-[200px] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg focus:outline-none ${className}`}
          >
            {items.map((item, index) => {
              if (item.isSeparator) {
                return (
                  <div
                    key={`separator-${index}`}
                    className="my-2 h-px bg-gray-200"
                  />
                );
              }

              return (
                <div
                  key={`item-${index}`}
                  onClick={() => {
                    if (!item.disabled && item.onClick) {
                      item.onClick();
                      closeMenu();
                    }
                  }}
                  className={
                    `flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-100 ${item.disabled ? "cursor-not-allowed text-gray-400" : "cursor-pointer text-gray-700"} ${item.className}` // Apply custom class
                  }
                >
                  {item.icon && (
                    <span className="h-4 w-4 flex-shrink-0">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                  {item.rightIcon && (
                    <span className="ml-auto h-4 w-4 flex-shrink-0">
                      {item.rightIcon}
                    </span>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
