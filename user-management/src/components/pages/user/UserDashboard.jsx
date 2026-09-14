import { useEffect, useState } from "react";

function UserDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    if (!user?.id) {
      return;
    }

    fetch(
      `http://localhost:8080/api/user/${user.id}/tasks`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error(error));

  }, [user?.id, token]);

  return (
    <div className="dashboard">

      <h1>
        Welcome, {user?.name}
      </h1>

      <div className="dashboard-cards">

        <div className="card">

          <h3>My Tasks</h3>

          <p>
            {tasks.length}
          </p>

        </div>

        <div className="card">

          <h3>My Role</h3>

          <p>
            {user?.roles?.[0] ||
              user?.role ||
              "USER"}
          </p>

        </div>

        <div className="card">

          <h3>Account</h3>

          <p>
            Active
          </p>

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;