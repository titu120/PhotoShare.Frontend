import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();   // AuthContext থেকে login function নেওয়া হচ্ছে

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(email, password);
      login();          // Context কে জানানো হচ্ছে — "এখন থেকে isLoggedIn = true"
      navigate("/");
    } catch (err) {
      setError("Email অথবা Password ভুল হয়েছে");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <h1 className="auth-title">PhotoShare</h1>
        <p className="text-muted auth-subtitle">আপনার account এ Login করুন</p>

        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary auth-submit">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Account নেই? <Link to="/register" className="auth-link">Register করুন</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;