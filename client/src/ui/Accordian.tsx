import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { FiMinus } from "react-icons/fi";

function Accordian({ question, answer }: { question: string; answer: string }) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <div
            onClick={() => setIsExpanded((expand) => !expand)}
            className="border border-neutral-700 px-4 py-6 rounded-lg violet-gradient"
        >
            <div className="flex items-center justify-between">
                <p>{question}</p>
                {isExpanded ? <FiMinus size={20} /> : <LuPlus size={20} />}
            </div>
            {isExpanded ? (<p className="mt-6">{answer}</p>) : null}
        </div>
    );
}

export default Accordian;
