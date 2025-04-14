import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PopupModal = () => {
  const [show, setShow] = useState(false);
  const [launch, setLaunch] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("diagnostiq_popup_shown");
    if (!hasVisited) {
      setShow(true);
      sessionStorage.setItem("diagnostiq_popup_shown", "true");
    }
  }, []);

  const handleLaunch = () => {
    if (started) return;
    setStarted(true);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setLaunch(true);
          setTimeout(() => setShow(false), 3000);
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <AnimatePresence>
        {!launch ? (
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4 }}
            className="bg-white/10 backdrop-blur-lg text-white rounded-3xl p-6 md:p-10 max-w-2xl w-full text-center shadow-[0_0_60px_8px_rgba(168,85,247,0.6)]"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-extrabold mb-3 tracking-wide drop-shadow-md"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to <span className="text-purple-400">DiagnostiQ</span> 🚀
            </motion.h2>

            <motion.p
              className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed max-w-xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Your AI-powered companion for smart symptom checking, report-based insights, and personalized wellness.
            </motion.p>

            {/* Countdown */}
            <AnimatePresence>
              {started && countdown > 0 && (
                <motion.div
                  key={countdown}
                  className="text-6xl md:text-7xl font-bold text-purple-300 mb-6"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {countdown}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={handleLaunch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={started}
              className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 md:px-10 py-3 rounded-full shadow-xl transition-all duration-300 ${
                started ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              Let’s Begin
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="launch"
            className="flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-purple-300 drop-shadow-lg mb-4"
            >
              DiagnostiQ 🚀
            </motion.div>

            {/* Rocket animation */}
            <motion.div
              className="flex flex-col items-center relative text-7xl md:text-8xl"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -700, opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            >
              {/* Flames */}
              <motion.div
                className="absolute -bottom-6 text-2xl md:text-3xl text-orange-400"
                animate={{ opacity: [0, 1, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                🔥🔥
              </motion.div>

              {/* Rocket */}
              <motion.div
                className="drop-shadow-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                  y: [0, -2, 2, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                }}
              >
                🚀
              </motion.div>
            </motion.div>

            <motion.p
              className="text-sm md:text-base text-gray-300 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Launching your health journey...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopupModal;
