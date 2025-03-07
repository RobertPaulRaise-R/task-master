function Priority({ priority }: { priority: "high" | "medium" | "low" }) {
  const color =
    priority === "high"
      ? "bg-red-100 text-red-800"
      : priority === "medium"
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800";

  return (
    <span className={`text-xs font-normal px-2 py-1 rounded-full ${color}`}>
      {priority}
    </span>
  );
}

export default Priority;
