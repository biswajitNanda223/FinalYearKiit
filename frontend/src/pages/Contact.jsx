import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane } from "react-icons/fa";
import { submitContactForm } from "../services/api";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const response = await submitContactForm(formData);
      if (response.error) {
        toast.error("❌ Failed to send message. Please try again.", {
          style: {
            background: "#fff0f6",
            color: "#a61e4d",
            border: "1px solid #e0a3c1",
          },
        });
      } else {
        toast.success("✅ Message sent successfully!", {
          style: {
            background: "#f3e8ff",
            color: "#6b21a8",
            border: "1px solid #c084fc",
          },
        });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        style: {
          background: "#fff0f6",
          color: "#a61e4d",
        },
      });
    }

    setSubmitted(false);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center justify-center min-h-screen bg-white px-6 py-12"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg mt-16 p-6 bg-purple-100 rounded-2xl shadow-2xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold mb-4 text-center text-purple-600"
          >
            📬 Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center text-gray-600 mb-6"
          >
            We’d love to hear from you! Send us a message.
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <motion.div
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex items-center bg-white p-3 rounded-lg border border-purple-400 shadow-md"
            >
              <FaUser className="text-purple-600 mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none text-purple-800 placeholder-purple-400"
                required
              />
            </motion.div>

            {/* Email Input */}
            <motion.div
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex items-center bg-white p-3 rounded-lg border border-purple-400 shadow-md"
            >
              <FaEnvelope className="text-purple-600 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none text-purple-800 placeholder-purple-400"
                required
              />
            </motion.div>

            {/* Message Input */}
            <motion.div
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex items-start bg-white p-3 rounded-lg border border-purple-400 shadow-md"
            >
              <FaCommentDots className="text-purple-600 mr-3 mt-1" />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none h-24 resize-none text-purple-800 placeholder-purple-400"
                required
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold text-lg flex justify-center items-center gap-2 transition-all shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={submitted ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : {}}
            >
              <FaPaperPlane />
              {submitted ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Contact;
