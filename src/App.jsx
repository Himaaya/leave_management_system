import { useState, useEffect } from "react";
import "./App.css";

export default function App() {

  const KEY = "leave_data";

  
  const getLeaves = () => {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  };

  
  const [page, setPage] = useState("home");

  const [leaves, setLeaves] = useState(getLeaves());

  const [editData, setEditData] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "",
    days: "",
    image: "",
    status: "Pending",
  });

 
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(leaves));
  }, [leaves]);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.type || !form.days) {
      alert("Please fill all fields");
      return;
    }

    
    if (editData) {

      const updatedLeaves = leaves.map((item) =>
        item.id === editData.id
          ? { ...form, id: editData.id }
          : item
      );

      setLeaves(updatedLeaves);

      setEditData(null);

    } else {

      // ADD
      const newLeave = {
        ...form,
        id: Date.now(),
      };

      setLeaves([...leaves, newLeave]);
    }

    setForm({
      name: "",
      type: "",
      days: "",
      image: "",
      status: "Pending",
    });

    setPage("home");
  };

  
  const handleDelete = (id) => {
    setLeaves(
      leaves.filter((item) => item.id !== id)
    );
  };

  const handleEdit = (item) => {

    setEditData(item);

    setForm({
      name: item.name,
      type: item.type,
      days: item.days,
      image: item.image,
      status: item.status,
    });

    setPage("form");
  };

 
  const handleToggle = (id) => {

    const updated = leaves.map((item) => {

      if (item.id === id) {

        return {
          ...item,
          status:
            item.status === "Pending"
              ? "Approved"
              : "Pending",
        };
      }

      return item;
    });

    setLeaves(updated);
  };

  
  const total = leaves.length;

  const pending = leaves.filter(
    (item) => item.status === "Pending"
  ).length;

  const approved = leaves.filter(
    (item) => item.status === "Approved"
  ).length;

  return (
    <div className="main-container">

      {}

      {page === "home" && (

        <>
          <h2>Leave Management System</h2>

          {}

          <div className="dashboard">

            <div className="dash-card total">
              Total Leaves
              <span>{total}</span>
            </div>

            <div className="dash-card pending">
              Pending
              <span>{pending}</span>
            </div>

            <div className="dash-card approved">
              Approved
              <span>{approved}</span>
            </div>

          </div>

          {}

          <button
            className="apply-btn"
            onClick={() => {

              setEditData(null);

              setForm({
                name: "",
                type: "",
                days: "",
                image: "",
                status: "Pending",
              });

              setPage("form");
            }}
          >
            Apply Leave
          </button>

          {}

          <div className="card-container">

            {leaves.map((item) => (

              <div className="card" key={item.id}>

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

                  <button onClick={() => handleEdit(item)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>

                  <button onClick={() => handleToggle(item.id)}>
                    Toggle
                  </button>

                </div>

              </div>

            ))}

          </div>
        </>
      )}

      {}

      {page === "form" && (

        <div className="form-page">

          <h2>
            {editData ? "Edit Leave" : "Apply Leave"}
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Employee Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="type"
              placeholder="Leave Type"
              value={form.type}
              onChange={handleChange}
            />

            <input
              type="number"
              name="days"
              placeholder="Number of Days"
              value={form.days}
              onChange={handleChange}
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
            />

            <button type="submit">
              {editData ? "Update Leave" : "Add Leave"}
            </button>

            <button
              type="button"
              className="back-btn"
              onClick={() => setPage("home")}
            >
              Back
            </button>

          </form>

        </div>
      )}

    </div>
  );
}