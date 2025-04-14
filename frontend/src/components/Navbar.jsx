import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-600 to-purple-400 bg-opacity-80 backdrop-blur-xl shadow-lg border-b border-purple-300"
    >
      <div className="container mx-auto flex justify-between items-center p-4 md:px-8">
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 drop-shadow-lg"
        >
          HealthAI
        </motion.h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-lg font-semibold">
          {navItems.map(({ name, path }, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={path}
                className="relative text-white hover:text-gray-200 transition duration-300 after:block after:h-0.5 after:w-full after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {name}
              </Link>
            </motion.li>
          ))}
          {user && <li className="text-white font-semibold">Welcome, {user.name || "User"}</li>}
          {user ? (
            <motion.li
              whileHover={{ scale: 1.1, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span
                onClick={handleLogout}
                className="cursor-pointer text-white hover:text-gray-200 transition duration-300 relative after:block after:h-0.5 after:w-full after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                Logout
              </span>
            </motion.li>
          ) : (
            <>
              <motion.li
                whileHover={{ scale: 1.1, y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.1, y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to="/register" className="text-white hover:text-gray-200">Register</Link>
              </motion.li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-purple-700 text-white shadow-lg rounded-b-lg"
          >
            <ul className="flex flex-col text-center py-4 space-y-4">
              {navItems.map(({ name, path }, index) => (
                <li key={index}>
                  <Link
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 hover:bg-purple-600 transition"
                  >
                    {name}
                  </Link>
                </li>
              ))}
              {user && <li className="font-semibold">Welcome, {user?.name || "User"}</li>}
              {user ? (
                <li>
                  <span
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block py-2 cursor-pointer hover:bg-purple-600 transition"
                  >
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 hover:bg-purple-600 transition">Login</Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="block py-2 hover:bg-purple-600 transition">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
