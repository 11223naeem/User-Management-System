import { useEffect, useState } from "react";

function Users() {

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const getUsers = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Unable to load users");
      }

      const data = await response.json();

      setUsers(data);

    } catch (error) {

      alert(error.message);

    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const saveUser = async (e) => {

    e.preventDefault();

    try {

      const url = editingId
        ? `http://localhost:8080/api/admin/users/${editingId}`
        : "http://localhost:8080/api/admin/users";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {

        method,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify(form)

      });

      if (!response.ok) {

        const message = await response.text();

        throw new Error(message || "Operation failed");
      }

      setForm({
        name: "",
        email: "",
        password: ""
      });

      setEditingId(null);

      getUsers();

    } catch (error) {

      alert(error.message);

    }
  };

  const editUser = (user) => {

    setEditingId(user.id);

    setForm({
      name: user.name,
      email: user.email,
      password: ""
    });

  };

  const deleteUser = async (id) => {

    if (!window.confirm("Delete this user?")) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8080/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      getUsers();

    } catch (error) {

      alert(error.message);

    }
  };

  return (
    <div className="page">

      <h1>Manage Users</h1>

      <div className="form-card">

        <h2>
          {editingId ? "Update User" : "Create User"}
        </h2>

        <form onSubmit={saveUser}>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder={
              editingId
                ? "New Password (optional)"
                : "Password"
            }
            value={form.password}
            onChange={handleChange}
            required={!editingId}
          />

          <button type="submit">
            {editingId ? "Update User" : "Create User"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({
                  name: "",
                  email: "",
                  password: ""
                });
              }}
            >
              Cancel
            </button>
          )}

        </form>

      </div>

      <div className="table-card">

        <h2>All Users</h2>

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {users.map(user => (

              <tr key={user.id}>

                <td>{user.id}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>
                  {user.roles?.map(role => role.name).join(", ") ||
                    "No Role"}
                </td>

                <td>

                  <button
                    onClick={() => editUser(user)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Users;