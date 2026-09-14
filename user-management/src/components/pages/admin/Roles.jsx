import { useEffect, useState } from "react";

function Roles() {

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

    const token = localStorage.getItem("token");

    // IMPORTANT:
    // These IDs must match the IDs in the roles table.
    const roles = [
        {
            id: 7,
            name: "Admin"
        },
        {
            id: 4,
            name: "Manager"
        },
        {
            id: 1,
            name: "User"
        }
    ];

    const fetchUsers = () => {

        fetch(
            "http://localhost:8080/api/admin/users",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                return response.json();
            })
            .then(data => setUsers(data))
            .catch(error => console.error(error));

    };

    useEffect(() => {

        fetchUsers();

    }, [token]);


    const assignRole = async () => {

        if (!selectedUser || !selectedRole) {

            alert("Please select user and role");

            return;
        }

        try {

            const response = await fetch(
                `http://localhost:8080/api/admin/users/${selectedUser}/roles/${selectedRole}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {

                const message = await response.text();

                throw new Error(
                    message || "Failed to assign role"
                );
            }

            alert("Role assigned successfully");

            // Refresh users/roles
            fetchUsers();

            // Reset selections
            setSelectedUser("");
            setSelectedRole("");

        } catch (error) {

            console.error(error);

            alert(error.message);

        }
    };


    return (
        <div className="page">

            <h1>Role Management</h1>


            <div className="form-card">

                <h2>Assign Role</h2>


                {/* USER SELECT */}

                <select
                    value={selectedUser}
                    onChange={(e) =>
                        setSelectedUser(e.target.value)
                    }
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


                {/* ROLE SELECT */}

                <select
                    value={selectedRole}
                    onChange={(e) =>
                        setSelectedRole(e.target.value)
                    }
                >

                    <option value="">
                        Select Role
                    </option>

                    {roles.map(role => (

                        <option
                            key={role.id}
                            value={role.id}
                        >
                            {role.name}
                        </option>

                    ))}

                </select>


                <button onClick={assignRole}>
                    Assign Role
                </button>

            </div>


            {/* CURRENT USERS */}

            <div className="table-card">

                <h2>Current Users & Roles</h2>

                <table>

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Roles</th>
                        </tr>

                    </thead>


                    <tbody>

                        {users.map(user => (

                            <tr key={user.id}>

                                <td>
                                    {user.id}
                                </td>

                                <td>
                                    {user.name}
                                </td>

                                <td>
                                    {user.email}
                                </td>

                                <td>
                                    {user.roles?.map(
                                        role => role.name
                                    ).join(", ") || "No Role"}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Roles;