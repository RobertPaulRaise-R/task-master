import { useEffect, useRef } from "react";

export function useOutsideClick(show: boolean, setShow: (value: boolean) => void) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                ref.current &&
                !ref.current.contains(event.target as Node)
            ) {
                setShow(false);
            }
        }

        if (show) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [show, setShow]);

    return ref;
}
