function KanbanHeader({ label }: { label: string }) {
  return (
    <div className="bg-brand-300">
      <span>{label}</span>
    </div>
  );
}

export default KanbanHeader;
