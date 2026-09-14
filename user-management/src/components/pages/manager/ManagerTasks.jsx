import { useEffect, useState } from "react";

function ManagerTasks() {

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");

  const [task, setTask] = useState({
    title: "",
    description: ""
  });

  const token = localStorage.getItem("token");

  const loadData = async () => {

    try {

      const usersResponse = await fetch(
        "http://localhost:8080/api/manager/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const tasksResponse = await fetch(
        "http://localhost:8080/api/manager/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!usersResponse.ok || !tasksResponse.ok) {
        throw new Error("Failed to load data");
      }

      setUsers(await usersResponse.json());
      setTasks(await tasksResponse.json());

    } catch (error) {

      alert(error.message);

    }
  };

  useEffect(() => {

    loadData();

  }, [token]);

  const handleChange = (e) => {

    setTask({
      ...task,
      [e.target.name]: e.target.value
    });

  };

  const assignTask = async (e) => {

    e.preventDefault();

    if (!selectedUser) {

      alert("Please select a user");

      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8080/api/manager/tasks/${selectedUser}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify(task)
        }
      );

      if (!response.ok) {

        const message = await response.text();

        throw new Error(
          message || "Failed to assign task"
        );
      }

      alert("Task assigned successfully");

      setTask({
        title: "",
        description: ""
      });

      setSelectedUser("");

      loadData();

    } catch (error) {

      alert(error.message);

    }
  };

  return (
    <div className="page">

      <h1>Manager Tasks</h1>

      <div className="form-card">

        <h2>Assign Task</h2>

        <form onSubmit={assignTask}>

          <select
            value={selectedUser}
            onChange={(e) =>
              setSelectedUser(e.target.value)
            }
            required
          >

            <option value="">
              Select User
            </option>

            {users.map(user => (

              <option
                key={user.id}
                value={user.id}
              >
                {user.name} - {user.email}
              </option>

            ))}

          </select>

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={task.description}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Assign Task
          </button>

        </form>

      </div>

      <div className="table-card">

        <h2>All Assigned Tasks</h2>

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Assigned User</th>
            </tr>

          </thead>

          <tbody>

            {tasks.map(task => (

              <tr key={task.id}>

                <td>{task.id}</td>

                <td>{task.title}</td>

                <td>{task.description}</td>

                <td>
                  {task.assignedUser?.name || "Not Assigned"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManagerTasks;