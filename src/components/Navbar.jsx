import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">PhotoShare</Link>

      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <Link to="/explore" className="navbar-link">Explore</Link>
            <Link to="/search" className="navbar-link">Search</Link>
            <Link to="/create" className="btn btn-primary">+ Post</Link>
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </>
        ) : (
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