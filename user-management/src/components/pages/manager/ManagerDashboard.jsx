import { useEffect, useState } from "react";

function ManagerDashboard() {

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const loadData = async () => {

      try {

        const userResponse = await fetch(
          "http://localhost:8080/api/manager/users",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const taskResponse = await fetch(
          "http://localhost:8080/api/manager/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!userResponse.ok || !taskResponse.ok) {
          throw new Error("Failed to load manager data");
        }

        setUsers(await userResponse.json());
        setTasks(await taskResponse.json());

      } catch (error) {

        console.error(error);

      }
    };

    loadData();

  }, [token]);

  return (
    <div className="dashboard">

      <h1>Manager Dashboard</h1>

      <div className="dashboard-cards">

        <div className="card">

          <h3>Total Users</h3>

          <p>
            {users.length}
          </p>

        </div>

        <div className="card">

          <h3>Total Tasks</h3>

          <p>
            {tasks.length}
          </p>

        </div>

        <div className="card">

          <h3>Access</h3>

          <p>
            Manager
          </p>

        </div>

      </div>

    </div>
  );
}

export default ManagerDashboard;