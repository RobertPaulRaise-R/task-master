function StatsCard({ name, value }: { name: string; value: number }) {
  return (
    <div className="border-light-300 rounded-md border px-4 py-5">
      <p className="text-light-700 text-sm">{name}</p>
      <h3 className="mt-2">{value}</h3>
    </div>
  );
}

export default StatsCard;
