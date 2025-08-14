import { ReactNode } from "react";

function Label({ label }: { label: string | ReactNode }) {
    return (
        <label className="text-light-700 dark:text-neutral-400 flex items-center gap-2">
            {label}
        </label>
    );
}

export default Label;
