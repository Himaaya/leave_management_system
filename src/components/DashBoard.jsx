export default function Dashboard({ leaves }) {
  const total = leaves.length;
  const pending = leaves.filter((l) => l.status === "Pending").length;
  const approved = leaves.filter((l) => l.status === "Approved").length;

  return (
    <div className="dashboard">
      <div className="dash-card total">Total {total}</div>
      <div className="dash-card pending">Pending {pending}</div>
      <div className="dash-card approved">Approved {approved}</div>
    </div>
  );
}