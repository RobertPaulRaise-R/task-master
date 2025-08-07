import { RefObject, useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(
    handler: () => void,
    listenCapturing = true,
): RefObject<T> {
    const ref = useRef<T>(null as unknown as T);

    useEffect(
        function() {
            function handleClick(e: MouseEvent) {
                if (ref.current && !ref.current.contains(e.target as Node)) {
                    handler();
                }
            }

            document.addEventListener("click", handleClick, listenCapturing);

            return () =>
                document.removeEventListener("click", handleClick, listenCapturing);
        },
        [handler, listenCapturing],
    );

    return ref;
}
