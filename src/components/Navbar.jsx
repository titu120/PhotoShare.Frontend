import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getToken } from "../services/authService";

function getCurrentUserId() {
  try {
    const token = getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || payload.sub;
  } catch (err) {
    return null;   // Token ভুল/অসম্পূর্ণ হলে, crash না করে শুধু null ফেরত
  }
}

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const currentUserId = getCurrentUserId();

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
            {currentUserId && (
              <Link to={`/profile/${currentUserId}`} className="navbar-link">Profile</Link>
            )}
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