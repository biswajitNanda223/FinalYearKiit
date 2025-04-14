import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { PersonAdd } from "@mui/icons-material";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    gender: "Male",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const response = await register(formData);
    setLoading(false);

    if (response.success) {
      setMessage(response.message);
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        navigate("/login");
      }, 2000);
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 mt-16 relative w-full sm:p-6">
      {/* Snackbar Notification */}
      {showSnackbar && (
        <motion.div
          className="fixed top-4 left-4 bg-purple-700 text-white px-6 py-3 rounded-lg shadow-xl text-center text-xs sm:text-sm z-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.div>
      )}

      <motion.div
        className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl border border-purple-600 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Register
        </h2>

        <p className="text-gray-700 text-sm sm:text-base mb-6">Create an account with your details.</p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 sm:p-3 rounded-md mb-4 text-xs sm:text-sm">
            {error.split("\n").map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="p-2 sm:p-3 text-sm sm:text-lg border border-purple-600 rounded-md outline-none w-full"
            autoComplete="username"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="p-2 sm:p-3 text-sm sm:text-lg border border-purple-600 rounded-md outline-none w-full"
            autoComplete="email"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            required
            value={formData.age}
            onChange={handleChange}
            className="p-2 sm:p-3 text-sm sm:text-lg border border-purple-600 rounded-md outline-none w-full"
            autoComplete="age"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-2 sm:p-3 text-sm sm:text-lg border border-purple-600 rounded-md outline-none w-full"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="p-2 sm:p-3 text-sm sm:text-lg border border-purple-600 rounded-md outline-none w-full"
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white p-2 sm:p-3 text-sm sm:text-lg rounded-md flex items-center justify-center gap-2 hover:bg-purple-700 transition w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="loader"></span>
            ) : (
              <>
                <PersonAdd /> Register
              </>
            )}
          </button>
        </form>

        <p className="mt-3 sm:mt-4 text-xs sm:text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-semibold">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
