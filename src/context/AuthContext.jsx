import { createContext, useState, useContext, useEffect } from "react";
import { getToken, logoutUser as logoutFromService } from "../services/authService";

// Context তৈরি করা হচ্ছে — এটাই সেই "কেন্দ্রীয় জায়গা"
const AuthContext = createContext();

// এই Component পুরো App কে "wrap" করবে, এবং Auth সংক্রান্ত তথ্য সরবরাহ করবে
export function AuthProvider({ children }) {
  // isLoggedIn — বর্তমানে কেউ Login করা আছে কিনা
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // App প্রথমবার Load হওয়ার সময়, localStorage এ Token আছে কিনা check করা হচ্ছে
  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Login হলে এই function call হবে, isLoggedIn true করে দিবে
  const login = () => {
    setIsLoggedIn(true);
  };

  // Logout হলে এই function call হবে
  const logout = () => {
    logoutFromService();       // localStorage থেকে Token মুছে ফেলা
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// এই custom hook দিয়ে যেকোনো Component সহজে Auth তথ্য ব্যবহার করতে পারবে
export function useAuth() {
  return useContext(AuthContext);
}