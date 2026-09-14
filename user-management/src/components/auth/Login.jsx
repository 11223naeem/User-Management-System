
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email.trim()) {
            alert("Please enter your email.");
            return;
        }

        if (!password) {
            alert("Please enter your password.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:8080/api/user/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        email: email.trim(),
                        password: password,
                    }),
                }
            );

            const contentType =
                response.headers.get("content-type");

            let data;

            if (
                contentType &&
                contentType.includes("application/json")
            ) {

                data = await response.json();

            } else {

                data = await response.text();
            }

            if (!response.ok) {

                alert(
                    typeof data === "string"
                        ? data
                        : data.message || "Login failed."
                );

                return;
            }

            // -------------------------------------------------
            // Get roles
            // -------------------------------------------------

            let roles = data.roles || [];

            if (!Array.isArray(roles)) {
                roles = [roles];
            }

            roles = roles
                .map((role) => {

                    if (typeof role === "string") {
                        return role.toUpperCase();
                    }

                    return role?.name?.toUpperCase();

                })
                .filter(Boolean);

            console.log("Logged in user:", data);
            console.log("User roles:", roles);

            // -------------------------------------------------
            // Save user
            // -------------------------------------------------

            const loggedInUser = {
                id: data.id,
                name: data.name,
                email: data.email,
                roles: roles,
            };

            localStorage.setItem(
    "token",
    data.token
);
            localStorage.setItem(
                "user",
                JSON.stringify(loggedInUser)
            );

            // -------------------------------------------------
            // Redirect based on role
            // -------------------------------------------------

            if (roles.includes("ADMIN")) {

                navigate("/admin");

            } else if (roles.includes("MANAGER")) {

                navigate("/manager");

            } else if (roles.includes("USER")) {

                navigate("/user");

            } else {

                alert(
                    "Login successful, but no valid role is assigned."
                );

                localStorage.removeItem("user");
            }

        } catch (error) {

            console.error("Login error:", error);

            alert(
                "Unable to connect to the backend. " +
                "Please check that Spring Boot is running on port 8080."
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="auth-page">

            {/* LEFT SECTION */}

            <section className="auth-hero">

                <div className="brand">

                    <div className="brand-logo">
                        U
                    </div>

                    <div>
                        <h2>UserFlow</h2>

                        <span>
                            User Management System
                        </span>
                    </div>

                </div>


                <div className="hero-content">

                    <div className="hero-badge">
                        <span>●</span>
                        USER MANAGEMENT PLATFORM
                    </div>

                    <h1>
                        Manage users.
                        <br />
                        <span>Manage everything.</span>
                    </h1>

                    <p>
                        A centralized platform for managing
                        users, roles and tasks with ease.
                    </p>


                    <div className="feature-list">

                        <div className="feature">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <div>
                                <strong>
                                    Role-Based Access
                                </strong>

                                <small>
                                    Admin, Manager and User
                                    permissions
                                </small>
                            </div>

                        </div>


                        <div className="feature">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <div>
                                <strong>
                                    Secure Passwords
                                </strong>

                                <small>
                                    Passwords are encrypted
                                    before storage
                                </small>
                            </div>

                        </div>


                        <div className="feature">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <div>
                                <strong>
                                    Task Management
                                </strong>

                                <small>
                                    Assign and manage tasks
                                    easily
                                </small>
                            </div>

                        </div>

                    </div>

                </div>


                <div className="hero-footer">
                    © 2026 UserFlow · Secure & Reliable
                </div>

            </section>


            {/* RIGHT SECTION */}

            <section className="auth-form-section">

                <div className="auth-card">

                    <div className="mobile-brand">

                        <div className="brand-logo">
                            U
                        </div>

                        <strong>
                            UserFlow
                        </strong>

                    </div>


                    <div className="form-heading">

                        <div className="welcome-icon">
                            👋
                        </div>

                        <h1>
                            Welcome back
                        </h1>

                        <p>
                            Sign in to access your dashboard
                        </p>

                    </div>


                    <form onSubmit={handleLogin}>

                        {/* EMAIL */}

                        <div className="input-group">

                            <label>
                                Email address
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    @
                                </span>

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    autoComplete="email"
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="input-group">

                            <div className="password-label">

                                <label>
                                    Password
                                </label>

                                <span>
                                    Protected
                                </span>

                            </div>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    •••
                                </span>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="current-password"
                                />

                                <button
                                    type="button"
                                    className="show-password"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* LOGIN */}

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >

                            {loading ? (
                                "Signing in..."
                            ) : (
                                <>
                                    Sign in
                                    <span>→</span>
                                </>
                            )}

                        </button>

                    </form>


                    <div className="security-note">

                        <span>
                            🔒
                        </span>

                        <div>

                            <strong>
                                Secure login
                            </strong>

                            <small>
                                Your password is securely
                                encrypted.
                            </small>

                        </div>

                    </div>


                    <div className="auth-bottom">

                        <span>
                            Authorized users only
                        </span>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Login;
