import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "@mui/icons-material";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login.json";
import loadingTransition from "../assets/loading.json";

const Snackbar = ({ message, isError }) => (
  <motion.div
    className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl z-50 text-xs sm:text-sm text-white ${
      isError ? "bg-red-600" : "bg-purple-700"
    }`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
  >
    {message}
  </motion.div>
);

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning, DiagnostiQ awaits you!";
    if (hour < 18) return "Good Afternoon, Ready to get insights?";
    return "Good Evening, Let's diagnose smartly!";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setShowSnackbar(false);

    const result = await login(credentials);
    setLoading(false);

    if (result.success) {
      const name = result.user?.name || "User";
      setUsername(name);
      setMessage(`Welcome ${name}! Redirecting...`);
      setShowSnackbar(true);

      // Snackbar visible for 3s, then transition for 3s, then navigate
      setTimeout(() => {
        setShowSnackbar(false);
        setTransitioning(true);
        setTimeout(() => {
          navigate("/");
        }, 3000); // Lottie shown for 3s
      }, 3000); // Snackbar visible for 3s
    } else {
      setError("Invalid credentials. Please try again.");
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 4000);
    }
  };

  useEffect(() => {
    if (user) {
      setUsername(user.name || "User");
      navigate("/");
    }
  }, [user, navigate]);

  if (transitioning) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Lottie animationData={loadingTransition} loop className="w-80" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 mt-10">
      <AnimatePresence>
        {showSnackbar && (
          <Snackbar message={error || message} isError={!!error} />
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl">
        <div className="w-full max-w-sm">
          <Lottie animationData={loginAnimation} loop />
        </div>

        <motion.div
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-purple-600 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-600 bg-clip-text text-transparent mb-6 mt-2">
            {username ? `Welcome, ${username}!` : getGreeting()}
          </h2>

          <p className="text-gray-700 mb-6">
            {username
              ? "You are already logged in."
              : "Please enter your login credentials to continue."}
          </p>

          {!username && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                autoComplete="email"
                autoFocus
                value={credentials.email}
                onChange={handleChange}
                className="p-3 text-lg border border-purple-600 rounded-md outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                autoComplete="current-password"
                value={credentials.password}
                onChange={handleChange}
                className="p-3 text-lg border border-purple-600 rounded-md outline-none"
              />

              <button
                type="submit"
                className={`bg-purple-600 text-white p-3 text-lg rounded-md flex items-center justify-center gap-2 transition-all duration-300 transform hover:bg-purple-700 hover:scale-105 active:scale-95 ${
                  loading && "cursor-not-allowed opacity-70"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                      ></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  <>
                    <Lock /> Login
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
