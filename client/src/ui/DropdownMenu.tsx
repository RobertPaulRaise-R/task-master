import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface DropdownMenuItem {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    isSeparator?: boolean;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    className?: string;
}

interface DropdownMenuProps {
    items: DropdownMenuItem[];
    triggerElement: React.ReactNode;
    placement?: "top" | "bottom" | "left" | "right";
    offset?: [number, number];
    className?: string;
    triggerClassName?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    items,
    triggerElement,
    placement = "right",
    offset = [0, 10],
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

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

    const getPositionStyles = () => {
        if (!triggerRef.current) {
            return { top: "0px", left: "0px" };
        }

        const triggerRect = triggerRef.current.getBoundingClientRect();

        //const containerRect = document.body.getBoundingClientRect();

        let top: number;

        const verticalOffset = offset[1];

        if (placement === "right") {
            top = triggerRect.height + verticalOffset;

            return {
                top: `${top}px`,
                right: 0,
            };
        } else if (placement === "left") {
            top = triggerRect.height + verticalOffset;

            return {
                top: `${top}px`,
                left: 0,
            };
        }
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
                        className={`absolute z-50 min-w-[200px] overflow-hidden rounded-md border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-lg focus:outline-none ${className}`}
                    >
                        {items.map((item, index) => {
                            if (item.isSeparator) {
                                return (
                                    <div
                                        key={`separator-${index}`}
                                        className="my-2 h-px bg-neutral-900"
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
                                        `flex items-center gap-2 px-4 py-2 text-sm dark:text-white transition-colors duration-200 hover:bg-gray-100 hover:dark:bg-neutral-700 ${item.disabled ? "cursor-not-allowed text-gray-400" : "cursor-pointer text-gray-700"} ${item.className}`
                                    }
                                >
                                    {item.icon && (
                                        <span className="h-4 w-4 flex-shrink-0">{item.icon}</span>
                                    )}
                                    <span className="">{item.label}</span>
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
