import { useState } from "react";

function Select({ options, value, setValue }: { options: string[]; value: string; setValue: (value: string) => void }) {
    const [showOptions, setShowOptions] = useState<boolean>(false);

    return (
        <div className="relative text-light-800 dark:text-white">
            <div className="py-2 px-4 rounded-sm bg-light-50 dark:bg-neutral-900 border border-light-800 dark:border-neutral-700" onClick={() => setShowOptions(true)}>
                {value}
            </div>

            <div className="z-10 flex flex-col absolute shadow-lg border-light-800 bg-light-100 dark:bg-neutral-800 w-full">
                {showOptions && options.length > 0 ? (
                    options.map((option, i) => (
                        <span 
                            className="py-1 px-4 hover:bg-light-300 dark:hover:bg-neutral-700"
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
