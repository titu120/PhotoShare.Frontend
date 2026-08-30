import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function RegisterPage() {
  // Form এর data রাখার জন্য state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error message দেখানোর জন্য state
  const [error, setError] = useState("");

  // Register হওয়ার পর অন্য page এ পাঠানোর জন্য
  const navigate = useNavigate();

  // Form Submit হলে এই function চলবে
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page reload হওয়া আটকানো হচ্ছে (browser এর default আচরণ)

    setError(""); // আগের error থাকলে মুছে ফেলা

    // Validation: দুটো password মিলছে কিনা
    if (password !== confirmPassword) {
      setError("Password দুটো মিলছে না");
      return;
    }

    try {
      // authService.js এর function কল করা হচ্ছে
      await registerUser(email, password);

      // Register সফল হলে Login page এ পাঠানো
      navigate("/login");
    } catch (err) {
      setError("Register করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <h1 className="auth-title">PhotoShare</h1>
        <p className="text-muted auth-subtitle">নতুন Account তৈরি করুন</p>

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
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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