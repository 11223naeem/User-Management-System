
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleRegister = async (e) => {

        e.preventDefault();

        // -------------------------------------------------
        // NAME
        // -------------------------------------------------

        if (!name.trim()) {
            alert("Please enter your name.");
            return;
        }


        // -------------------------------------------------
        // EMAIL
        // -------------------------------------------------

        if (!email.trim()) {
            alert("Please enter your email.");
            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.trim())) {

            alert(
                "Please enter a valid email address."
            );

            return;
        }


        // -------------------------------------------------
        // PASSWORD
        // -------------------------------------------------

        if (password.length < 8) {

            alert(
                "Password must contain at least 8 characters."
            );

            return;
        }

        if (!/[A-Z]/.test(password)) {

            alert(
                "Password must contain an uppercase letter."
            );

            return;
        }

        if (!/[a-z]/.test(password)) {

            alert(
                "Password must contain a lowercase letter."
            );

            return;
        }

        if (!/[0-9]/.test(password)) {

            alert(
                "Password must contain a number."
            );

            return;
        }

        if (!/[^A-Za-z0-9]/.test(password)) {

            alert(
                "Password must contain a special character."
            );

            return;
        }


        // -------------------------------------------------
        // CONFIRM PASSWORD
        // -------------------------------------------------

        if (password !== confirmPassword) {

            alert(
                "Passwords do not match."
            );

            return;
        }


        try {

            setLoading(true);

            // -------------------------------------------------
            // REGISTER API
            // -------------------------------------------------

            const response = await fetch(
                "http://localhost:8080/api/user/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name: name.trim(),
                        email: email.trim(),
                        password: password,
                    }),
                }
            );


            const contentType =
                response.headers.get("content-type");

            let data;

            if (contentType &&
                contentType.includes("application/json")) {

                data = await response.json();

            } else {

                data = await response.text();
            }


            // -------------------------------------------------
            // ERROR
            // -------------------------------------------------

            if (!response.ok) {

                alert(
                    typeof data === "string"
                        ? data
                        : data.message ||
                          "Registration failed."
                );

                return;
            }


            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            console.log(
                "Registered user:",
                data
            );

            alert(
                "Account created successfully! " +
                "Your account has USER access. Please login."
            );


            // Clear form

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");


            // Go to login

            navigate("/login");

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

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

            {/* LEFT */}

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

                        <span>
                            ●
                        </span>

                        GET STARTED TODAY

                    </div>


                    <h1>

                        Create your account.
                        <br />

                        <span>
                            Start managing.
                        </span>

                    </h1>


                    <p>

                        Create your UserFlow account and
                        access a simple and organized
                        user management platform.

                    </p>


                    <div className="feature-list">

                        <div className="feature">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <div>

                                <strong>
                                    Secure Account
                                </strong>

                                <small>
                                    Your password is encrypted
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
                                    Personal Dashboard
                                </strong>

                                <small>
                                    Access your profile and tasks
                                </small>

                            </div>

                        </div>


                        <div className="feature">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <div>

                                <strong>
                                    Role-Based Platform
                                </strong>

                                <small>
                                    Built for Admins, Managers
                                    and Users
                                </small>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="hero-footer">

                    © 2026 UserFlow · Secure & Reliable

                </div>

            </section>


            {/* RIGHT */}

            <section className="auth-form-section">

                <div className="auth-card register-card">

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
                            ✨
                        </div>

                        <h1>
                            Create account
                        </h1>

                        <p>
                            Create your account to get started
                        </p>

                    </div>


                    <form onSubmit={handleRegister}>

                        {/* NAME */}

                        <div className="input-group">

                            <label>
                                Full name
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    ◉
                                </span>

                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    autoComplete="name"
                                />

                            </div>

                        </div>


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

                            <label>
                                Password
                            </label>

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
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="new-password"
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


                        {/* PASSWORD REQUIREMENTS */}

                        <div className="password-hint">

                            <span>
                                Password must include:
                            </span>

                            <div>

                                <small>
                                    8+ characters
                                </small>

                                <small>
                                    Uppercase
                                </small>

                                <small>
                                    Number
                                </small>

                                <small>
                                    Special character
                                </small>

                            </div>

                        </div>


                        {/* CONFIRM PASSWORD */}

                        <div className="input-group">

                            <label>
                                Confirm password
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    ✓
                                </span>

                                <input
                                    type="password"
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                />

                            </div>

                        </div>


                        {/* REGISTER */}

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >

                            {loading ? (
                                "Creating account..."
                            ) : (
                                <>
                                    Create account
                                    <span>→</span>
                                </>
                            )}

                        </button>

                    </form>


                    <div className="auth-bottom">

                        <span>
                            Already have an account?
                        </span>

                        <Link to="/login">
                            Sign in
                        </Link>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Register;