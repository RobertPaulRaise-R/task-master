import ListSection from "../features/dashboard/ListSection";
import Task from "../features/dashboard/Task";

const sampleDate = [
  {
    name: "Complete MrBeast YT Thumbnail Design and Among us Thumbnail",
    dueDate: "21.3.2025",
  },
  { name: "task2", dueDate: "21.3.2025" },
  { name: "task3", dueDate: "21.3.2025" },
  { name: "task4", dueDate: "21.3.2025" },
  { name: "task4", dueDate: "21.3.2025" },
  { name: "task4", dueDate: "21.3.2025" },
  { name: "task4", dueDate: "21.3.2025" },
  { name: "task4", dueDate: "21.3.2025" },
  { name: "task4", dueDate: "21.3.2025" },
];

function Dashboard() {
  return (
    <div className="pt-4 mx-4">
      <div className="grid grid-cols-2 gap-x-10 gap-y-4">
        <ListSection>
          <ListSection.Header label="Assigned Tasks">
            <div></div>
          </ListSection.Header>

          <ListSection.List>
            {sampleDate.length > 0 ? (
              sampleDate.map((item, i) => <Task item={item} key={i} />)
            ) : (
              <span>There is no tasks right now</span>
            )}
          </ListSection.List>
        </ListSection>

        <ListSection>
          <ListSection.Header label="Projects">
            <div></div>
          </ListSection.Header>
        </ListSection>

        <ListSection>
          <ListSection.Header label="People">
            <div></div>
          </ListSection.Header>

          <ListSection.List>
            {sampleDate.map((item, i) => (
              <div
                key={i}
                className="h-14 mt-2 px-3 bg-white rounded-md flex items-center"
              >
                <span>{item.name}</span>
              </div>
            ))}
          </ListSection.List>
        </ListSection>

        <ListSection>
          <ListSection.Header label="Private Notepad">
            <div></div>
          </ListSection.Header>
        </ListSection>
      </div>
    </div>
  );
}

export default Dashboard;
