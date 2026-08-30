import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Frontend Validation
    if (!email.trim() || !password.trim()) {
      setError("সব field পূরণ করুন");
      return;
    }

    try {
      await loginUser(email, password);
      login();
      showToast("Login সফল হয়েছে!");
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
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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