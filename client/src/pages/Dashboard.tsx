import ListSection from "../features/dashboard/ListSection";
import TaskItem from "../features/dashboard/TaskItem";

const sampleDate = [
  {
    name: "Complete MrBeast YT Thumbnail Design",
    dueDate: "21.3.2025",
    status: "pending",
    assignedTo: "Robert Paul Raise",
    priority: "low",
  },
  {
    name: "Complete MrBeast YT Thumbnail Design",
    dueDate: "21.3.2025",
    status: "pending",
    assignedTo: "Robert Paul Raise",
    priority: "medium",
  },
  {
    name: "Complete MrBeast YT Thumbnail Design",
    dueDate: "21.3.2025",
    status: "pending",
    assignedTo: "Robert Paul Raise",
    priority: "high",
  },
  {
    name: "Complete MrBeast YT Thumbnail Design",
    dueDate: "21.3.2025",
    status: "pending",
    assignedTo: "Robert Paul Raise",
    priority: "low",
  },
  {
    name: "Complete MrBeast YT Thumbnail Design",
    dueDate: "21.3.2025",
    status: "pending",
    assignedTo: "Robert Paul Raise",
    priority: "low",
  },
];

function Dashboard() {
  return (
    <div className="mx-4 pt-4">
      <div className="grid grid-cols-2 gap-x-10 gap-y-4">
        <ListSection>
          <ListSection.Header label="Assigned Tasks">
            <div></div>
          </ListSection.Header>

          <ListSection.List>
            {sampleDate.length > 0 ? (
              sampleDate.map((item, i) => <TaskItem item={item} key={i} />)
            ) : (
              <span>There is no tasks right now</span>
            )}
          </ListSection.List>
        </ListSection>
      </div>
    </div>
  );
}

export default Dashboard;
