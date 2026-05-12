import { useState } from "react";

export default function LeaveForm({ onSubmit, initialData, onBack }) {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      type: "",
      days: "",
      image: "",
      status: "Pending",
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-page">
      <h2>Leave Form</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Employee Name"
        />

        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Leave Type"
        />

        <input
          name="days"
          value={form.days}
          onChange={handleChange}
          placeholder="Number of Days"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
        />

        

        <button type="submit">Submit</button>
        <button type="button" onClick={onBack}>
          Back
        </button>
      </form>
    </div>
  );
}