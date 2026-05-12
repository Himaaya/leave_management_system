import { useState, useEffect } from "react";
import Home from "./pages/Home";
import LeaveForm from "./components/LeaveForm";
import { getLeaves, saveLeaves } from "./utils/storage";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [leaves, setLeaves] = useState(() => getLeaves());
  const [editData, setEditData] = useState(null);

  

  // ✅ Save to LocalStorage whenever data changes
  useEffect(() => {
    saveLeaves(leaves);
  }, [leaves]);

  // ADD / UPDATE
  const handleSubmit = (data) => {
    if (!data.name || !data.type || !data.days) {
      alert("Fill all fields");
      return;
    }

    if (editData) {
      setLeaves(
        leaves.map((l) =>
          l.id === editData.id ? { ...data, id: editData.id } : l
        )
      );
      setEditData(null);
    } else {
      setLeaves([...leaves, { ...data, id: Date.now() }]);
    }

    setPage("home");
  };

  // DELETE
  const handleDelete = (id) => {
    setLeaves(leaves.filter((l) => l.id !== id));
  };

  // TOGGLE STATUS
  const handleToggle = (id) => {
    setLeaves(
      leaves.map((l) =>
        l.id === id
          ? {
              ...l,
              status: l.status === "Pending" ? "Approved" : "Pending",
            }
          : l
      )
    );
  };

  return (
    <>
      {page === "home" && (
        <Home
          leaves={leaves}
          onEdit={(item) => {
            setEditData(item);
            setPage("form");
          }}
          onDelete={handleDelete}
          onToggle={handleToggle}
          goForm={() => {
            setEditData(null);
            setPage("form");
          }}
        />
      )}

      {page === "form" && (
        <LeaveForm
          onSubmit={handleSubmit}
          initialData={editData}
          onBack={() => setPage("home")}
        />
      )}
    </>
  );
}