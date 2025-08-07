import { ReactNode } from "react";

function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
    return (
        <div className="bg-gradient-to-br from-indigo-900/10 via-neutral-900 to-red-900/10 border border-neutral-700 h-56 px-10 rounded-lg flex flex-col gap-3 items-center justify-center text-center">
            <div className="bg-neutral-950 border border-neutral-700 rounded-lg shadow-[4px_4px_23px_1px_#000000] size-10 text-white flex items-center justify-center">{icon}</div>

            <p className="font-medium">{title}</p>
            <p className="text-sm">{description}</p>

        </div>
    );
}

export default FeatureCard;
