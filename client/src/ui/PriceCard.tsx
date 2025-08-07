import { BiCheckCircle } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";

interface PriceCardProps {
    color: string;
    planName: string;
    desc: string;
    price: number;
    planLen: string;
    features: string[];
}

function PriceCard({ color, planName, desc, price, planLen, features }: PriceCardProps) {
    const colorClass = color === "orange" ? "orange-gradient" :
        color === "violet" ? "violet-gradient" :
            color === "green" ? "green-gradient" : "";

    return (
        <div className={`p-6 rounded-xl border border-neutral-700 ${colorClass}`}>
            <h4 className="font-medium text-lg">{planName}</h4>
            <p className="text-sm mt-1">{desc}</p>

            <div className="flex items-end gap-3">
                <p className="text-4xl mt-6">{price}$</p>
                <p>/{planLen}</p>
            </div>

            <button className="w-full bg-neutral-900 py-2 my-6 rounded-lg border border-neutral-700 flex items-center justify-center hover:bg-neutral-800 cursor-pointer">Get Started <IoIosArrowRoundForward size={20} /></button>

            <div className="flex flex-col gap-3">
                {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <BiCheckCircle />
                        <span>{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PriceCard;
