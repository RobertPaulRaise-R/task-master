function StatsCard({ name, value }: { name: string; value: number }) {
    return (
        <div className="text-light-900 border-light-300 dark:border-neutral-700 dark:bg-neutral-800 rounded-md border px-4 py-5">
            <p className="font-medium text-sm dark:text-neutral-400">{name}</p>
            <h3 className="dark:text-white mt-2">{value}</h3>
        </div>
    );
}

export default StatsCard;
