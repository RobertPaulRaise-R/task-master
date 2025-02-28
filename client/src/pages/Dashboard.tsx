import ListSection from "../features/dashboard/ListSection";

const sampleDate = [
  { name: "task1", dueDate: "21.3.2025" },
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
      <div className="grid grid-cols-2 gap-5">
        <ListSection>
          <ListSection.Header label="Assigned Tasks">
            <div></div>
          </ListSection.Header>

          <ListSection.List>
            {sampleDate.map((item, i) => (
              <div
                key={i}
                className="h-14 mt-2 px-3 bg-white rounded-md flex items-center shadow-md"
              >
                <span>{item.name}</span>
              </div>
            ))}
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
