import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser, registerUser } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("Loaded from LocalStorage:", JSON.parse(storedUser)); // Debugging output
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      console.log("API Response:", data);
  
      if (data.user) {
        console.log("User Data:", data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, message: "Login successful!", user: data.user }; // 🟢 return user
      } else {
        return { success: false, message: data.error || "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login Error:", error);
      return { success: false, message: "Something went wrong during login." };
    }
  };
  
  

  const register = async (userData) => {
    try {
      const data = await registerUser(userData);

      if (!data.error) {
        return { success: true, message: "Registration successful! Please log in." };
      } else {
        let errorMessages = [];
        if (data.error.username) {
          errorMessages.push(`Username: ${data.error.username.join(" ")}`);
        }
        if (data.error.password) {
          errorMessages.push(`Password: ${data.error.password.join(" ")}`);
        }
        return { success: false, message: errorMessages.join("\n") || "Registration failed" };
      }
    } catch (error) {
      console.error("Registration Error:", error);
      return { success: false, message: "Something went wrong during registration." };
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("user");
      setUser(null);
      return { success: true, message: "Logged out successfully!" };
    } catch (error) {
      console.error("Logout Error:", error);
      return { success: false, message: "Something went wrong during logout." };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);






