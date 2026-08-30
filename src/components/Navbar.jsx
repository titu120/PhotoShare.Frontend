import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // AuthContext এর logout() কল করা — Token মুছে ফেলা, isLoggedIn = false
    navigate("/login");  // Login page এ পাঠিয়ে দেওয়া
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">PhotoShare</Link>

      <div className="navbar-links">
        {isLoggedIn ? (
          // Login করা থাকলে — Logout বাটন দেখানো
          <button onClick={handleLogout} className="btn btn-outline">
            Logout
          </button>
        ) : (
          // Login করা না থাকলে — Login/Register লিংক দেখানো
          <>
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;