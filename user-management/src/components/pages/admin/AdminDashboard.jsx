import { useEffect, useState } from "react";

function AdminDashboard() {

  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {

    fetch("http://localhost:8080/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {

        if (!response.ok) {
          throw new Error("Failed to load users");
        }

        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error(error);
      });

  }, [token]);

  return (
    <div className="dashboard">

      <h1>Admin Dashboard</h1>

      <div className="dashboard-cards">

        <div className="card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>

        <div className="card">
          <h3>Role Management</h3>
          <p>Active</p>
        </div>

        <div className="card">
          <h3>Access</h3>
          <p>Administrator</p>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;