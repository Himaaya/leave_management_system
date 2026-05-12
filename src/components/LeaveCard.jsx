export default function LeaveCard({ item, onEdit, onDelete, onToggle }) {
  return (
    <div className="card">
      <img
        src={
          item.image ||
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        }
        alt="profile"
      />

      <h3>{item.name}</h3>
      <p>{item.type}</p>
      <p>{item.days} Days</p>

      <p className={item.status.toLowerCase()}>
        {item.status}
      </p>

      <div className="card-buttons">
        <button onClick={() => onEdit(item)}>Edit</button>
        <button onClick={() => onDelete(item.id)}>Delete</button>
        <button onClick={() => onToggle(item.id)}>Toggle</button>
      </div>
    </div>
  );
}