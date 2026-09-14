import { NavLink } from "react-router-dom";

function Sidebar() {

    const user = JSON.parse(localStorage.getItem("user"));

    let role = user?.roles?.[0]?.toUpperCase();

    const getLinkClass = ({ isActive }) =>
        `sidebar-link ${isActive ? "active" : ""}`;

    return (
        <aside className="sidebar">

            <div className="sidebar-brand">

                <div className="brand-logo">
                    UM
                </div>

                <div>
                    <h2>User Management</h2>
                    <span>Management System</span>
                </div>

            </div>


            <div className="sidebar-section">

                <p className="sidebar-title">
                    MAIN MENU
                </p>


                {/* ADMIN */}

                {role === "ADMIN" && (
                    <>
                        <NavLink
                            to="/admin"
                            className={getLinkClass}
                        >
                            <span className="sidebar-icon">⌂</span>
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/admin/users"
                            className={getLinkClass}
                        >
                            <span className="sidebar-icon">♙</span>
                            Users
                        </NavLink>

                        <NavLink
                            to="/admin/roles"
                            className={getLinkClass}
                        >
                            <span className="sidebar-icon">♜</span>
                            Roles
                        </NavLink>
                    </>
                )}


                {/* MANAGER */}

                {role === "MANAGER" && (
                    <>
                        <NavLink
                            to="/manager"
                            className={getLinkClass}
                        >
                            <span className="sidebar-icon">⌂</span>
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/manager/tasks"
                            className={getLinkClass}
                        >
                            <span className="sidebar-icon">✓</span>
                            Tasks
                        </NavLink>
                    </>
                )}


                {/* USER */}

                {role === "USER" && (
                    <>
                        <NavLink
                            to="/user"
                            className={getLinkClass}
                        >
                            <span className="sidebar-icon">⌂</span>
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/user/profile"
                            className={getLinkClass}
                        >
                            <span className="sidebar-icon">♙</span>
                            My Profile
                        </NavLink>

                        <NavLink
                            to="/user/tasks"
                            className={getLinkClass}
                        >
                            <span className="sidebar-icon">✓</span>
                            My Tasks
                        </NavLink>
                    </>
                )}

            </div>


            <div className="sidebar-bottom">

                <div className="sidebar-user">

                    <div className="sidebar-avatar">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div className="sidebar-user-info">

                        <strong>
                            {user?.name || "User"}
                        </strong>

                        <span>
                            {role || "USER"}
                        </span>

                    </div>

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;