import { useEffect, useState } from "react";

function MyTasks() {

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
      .then(response => {

        if (!response.ok) {
          throw new Error("Unable to load tasks");
        }

        return response.json();

      })
      .then(data => {

        setTasks(data);

      })
      .catch(error => {

        console.error(error);

      });

  }, [user?.id, token]);

  return (
    <div className="page">

      <h1>My Tasks</h1>

      <div className="table-card">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
            </tr>

          </thead>

          <tbody>

            {tasks.length === 0 ? (

              <tr>

                <td colSpan="3">
                  No tasks assigned
                </td>

              </tr>

            ) : (

              tasks.map(task => (

                <tr key={task.id}>

                  <td>
                    {task.id}
                  </td>

                  <td>
                    {task.title}
                  </td>

                  <td>
                    {task.description}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default MyTasks;