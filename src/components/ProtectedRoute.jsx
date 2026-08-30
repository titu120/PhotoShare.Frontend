import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// এই Component একটা "wrapper" — যেকোনো page কে এটা দিয়ে ঘিরে দিলে,
// Login করা না থাকলে সেই page দেখানো হবে না, বরং /login এ পাঠিয়ে দেওয়া হবে
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Navigate Component — এটা code থেকে অন্য page এ পাঠানোর React Router এর উপায়
    return <Navigate to="/login" />;
  }

  // Login করা থাকলে, ভেতরের আসল page (children) দেখানো হবে
  return children;
}

export default ProtectedRoute;