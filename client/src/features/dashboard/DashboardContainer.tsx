import { SlOptionsVertical } from "react-icons/sl";

type DashboardContainerType = { label: string; items?: object[]; bg?: string };

function DashboardContainer({
  label,
  items,
  bg = "bg-stone-600",
}: DashboardContainerType) {
  console.log(items);
  return (
    <div
      className="h-96 px-3 py-2 rounded-lg bg-gray-400 w-[560px]"
      style={{ backgroundColor: bg }}
    >
      <div className="flex justify-between items-center">
        <h3>{label}</h3>
        <div className="flex gap-2">
          <input className="w-20" type="number" />
          <button>
            <SlOptionsVertical />
          </button>
        </div>
      </div>

      <div>{/** Here we should render the assigned task list */}</div>
    </div>
  );
}

export default DashboardContainer;
