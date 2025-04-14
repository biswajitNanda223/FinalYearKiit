import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api"; // Updated function name

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const data = await logoutUser(); // Call the logout function
        if (data.message === "Logged out successfully") {
          localStorage.removeItem("user"); // Ensure user data is removed
          navigate("/login"); // Redirect to login page
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-2xl font-semibold">Logging out...</p>
    </div>
  );
};

export default Logout;
