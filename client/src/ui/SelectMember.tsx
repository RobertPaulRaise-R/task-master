import { useState } from "react";
import { UserI } from "../types";

function SelectMember({ options, value, setValue }: { options: UserI[]; value: UserI | undefined; setValue: (value: UserI) => void }) {
    const [showOptions, setShowOptions] = useState<boolean>(false);

    console.log(options);

    return (
        <div className="relative text-light-800 dark:text-white">
            <div className="py-2 px-4 h-min[42px] dark:text-white rounded-sm bg-light-50 dark:bg-neutral-900 border border-light-800 dark:border-neutral-700" onClick={() => setShowOptions(true)}>
                {value === undefined ? <span className="text-neutral-600">No options selected</span> : value.name}
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
                            {option.name}
                        </span>
                    ))
                ) : null
                }

            </div>
        </div>
    );
}

export default SelectMember;
