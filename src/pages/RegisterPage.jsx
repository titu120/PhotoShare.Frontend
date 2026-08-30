import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-card card">
        <h1 className="auth-title">PhotoShare</h1>
        <p className="text-muted auth-subtitle">নতুন Account তৈরি করুন</p>

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
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-input"
          />

          <button type="submit" className="btn btn-primary auth-submit">
            Register
          </button>
        </form>

        <p className="auth-switch">
          আগে থেকে Account আছে? <Link to="/login" className="auth-link">Login করুন</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;