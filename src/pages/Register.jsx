import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Lock, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const user = await register(fullName.trim(), email.trim(), password);
            navigate(user.role === "EMPLOYEE" ? "/employee" : `/${user.role.toLowerCase()}`);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                (err.response?.status === 409
                    ? "This email address is already registered."
                    : "Unable to create your account. Check the information and try again.")
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-logo">
                    <ShieldCheck size={34} />
                </div>
                <h1>Create an account</h1>
                <p className="login-subtitle">Register to report and track incidents</p>

                {error && (
                    <div className="error-message" role="alert">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="full-name">Full name</label>
                    <div className="input-wrapper">
                        <UserRound size={18} />
                        <input
                            id="full-name"
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                            maxLength={100}
                            autoComplete="name"
                            required
                        />
                    </div>

                    <label htmlFor="register-email">Email address</label>
                    <div className="input-wrapper">
                        <Mail size={18} />
                        <input
                            id="register-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            maxLength={150}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <label htmlFor="register-password">Password</label>
                    <div className="input-wrapper">
                        <Lock size={18} />
                        <input
                            id="register-password"
                            type="password"
                            placeholder="At least 8 characters"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            minLength={8}
                            maxLength={100}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <label htmlFor="confirm-password">Confirm password</label>
                    <div className="input-wrapper">
                        <Lock size={18} />
                        <input
                            id="confirm-password"
                            type="password"
                            placeholder="Enter your password again"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            minLength={8}
                            maxLength={100}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>

                <p className="register-link">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;