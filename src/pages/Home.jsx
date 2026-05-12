import Dashboard from "../components/Dashboard";
import LeaveCard from "../components/LeaveCard";

export default function Home({
  leaves,
  onEdit,
  onDelete,
  onToggle,
  goForm,
}) {
  return (
    <div>
      <h2>Leave Management System</h2>

      <Dashboard leaves={leaves} />

      <button onClick={goForm}>Apply Leave</button>

      <div className="card-container">
        {leaves.map((item) => (
          <LeaveCard
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}