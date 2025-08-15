import { useEffect, useRef, useState } from "react";

function Select({ options, value, setValue }: { options: string[]; value: string; setValue: (value: string) => void }) {
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const selectRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setShowOptions(false);
            }
        }

        if (showOptions) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showOptions]);


    return (
        <div ref={selectRef} className="relative text-light-800 dark:text-white w-[200px]">
            <div className="py-2 px-4 h-min[42px] dark:text-white rounded-sm bg-light-50 dark:bg-neutral-900 border border-light-800 dark:border-neutral-700" onClick={() => setShowOptions(true)}>
                {value === "" ? <span className="text-neutral-600">No options selected</span> : value}
            </div>

            <div className="z-10 mt-0.5 flex flex-col absolute shadow-lg rounded-md border-light-800 bg-light-100 dark:bg-neutral-800 w-full">
                {showOptions && options.length > 0 ? (
                    options.map((option, i) => (
                        <span
                            className="py-1 px-4 rounded-md hover:bg-light-300 dark:hover:bg-neutral-700"
                            key={i}
                            onClick={() => {
                                setValue(option)
                                setShowOptions(false)
                            }}>
                            {option}
                        </span>
                    ))
                ) : null
                }

            </div>
        </div>
    );
}

export default Select;
