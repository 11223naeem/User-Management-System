import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const role =
        user?.roles?.[0]?.toUpperCase() || "USER";


    const handleLogout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        navigate("/login");
    };


    return (
        <header className="navbar">

            <div className="navbar-left">

                <div>
                    <h1>
                        {role === "ADMIN" && "Admin Panel"}
                        {role === "MANAGER" && "Manager Panel"}
                        {role === "USER" && "My Workspace"}
                    </h1>

                    <p>
                        Manage your activities and information
                    </p>
                </div>

            </div>


            <div className="navbar-right">

                <div className="navbar-user">

                    <div className="navbar-avatar">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div className="navbar-user-info">

                        <strong>
                            {user?.name || "User"}
                        </strong>

                        <span>
                            {role}
                        </span>

                    </div>

                </div>


                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </header>
    );
}

export default Navbar;