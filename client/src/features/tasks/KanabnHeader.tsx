function KanbanHeader({ label }: { label: string }) {
  return (
    <div className="bg-light-300">
      <span>{label}</span>
    </div>
  );
}

export default KanbanHeader;
