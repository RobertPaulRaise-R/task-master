function KanbanHeader({ label }: { label: string }) {
    return (
        <div className="bg-brand-300 dark:bg-neutral-900">
            <span>{label}</span>
        </div>
    );
}

export default KanbanHeader;
