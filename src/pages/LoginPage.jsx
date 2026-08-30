import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-card card">
        <h1 className="auth-title">PhotoShare</h1>
        <p className="text-muted auth-subtitle">আপনার account এ Login করুন</p>

        <form className="auth-form">
          <input
            type="email"
            placeholder="Email"
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
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