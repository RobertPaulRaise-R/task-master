function FeatureCard({
  title,
  label,
  percentage,
  description,
}: {
  title: string;
  label: string;
  percentage: string;
  description: string;
}) {
  return (
    <div className="h-90 w-80 bg-gradient-to-br from-white/10 to-white/80 p-[1px]">
      <div className="flex h-full w-full flex-col justify-between gap-8 bg-gray-800 p-10">
        <span className="font-semibold">{title}</span>
        <div className="flex flex-col">
          <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-6xl font-bold text-transparent">
            {percentage}%
          </span>

          <span className="text-xs font-light">{label}</span>
        </div>
        <span className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white/70">
          {description}
        </span>
      </div>
    </div>
  );
}

export default FeatureCard;
