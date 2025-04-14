import { motion } from "framer-motion";
import { FaHospitalAlt, FaUserMd, FaAmbulance, FaBrain } from "react-icons/fa";
import React from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.8, type: "spring" },
  }),
};

const FloatingSVGBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <svg
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[...Array(7)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 800}
          cy={Math.random() * 600}
          r={80 + Math.random() * 40}
          fill="url(#grad)"
          initial={{ opacity: 0.3, y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 1.2,
          }}
        />
      ))}
    </svg>
  </div>
);

const About = () => {
  return (
    <div className="relative min-h-screen bg-purple-50 py-20 px-6 flex flex-col items-center justify-start overflow-hidden">
      <FloatingSVGBackground />

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl w-full bg-white p-8 rounded-3xl shadow-2xl border-t-8 border-purple-600 text-center"
      >
        <h2 className="text-4xl font-bold text-purple-600 mb-6">About DiagnostiQ</h2>
        <p className="text-lg text-gray-700">
          <strong>DiagnostiQ</strong> is a next-gen AI-powered health assistant that leverages advanced NLP models
          like <strong>BERT</strong> and <strong>spaCy</strong> to analyze symptoms and medical reports with precision.
          Our mission is to empower users to detect diseases early, interpret complex medical data, and get accurate
          health insights from the comfort of their homes.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          It also integrates <strong>Named Entity Recognition (NER)</strong> for structured Electronic Health Record (EHR)
          generation from uploaded medical reports—making diagnosis smarter, faster, and more reliable.
        </p>
      </motion.div>

      {/* Use Cases / Features Section */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl w-full">
        {[
          {
            icon: <FaUserMd size={36} className="text-purple-600 mb-2" />,
            title: "Doctor Collaboration",
            desc: "Doctors can access NER-based structured reports for quick insights, accurate treatment, and patient monitoring.",
          },
          {
            icon: <FaAmbulance size={36} className="text-purple-600 mb-2" />,
            title: "Ambulance Integration",
            desc: "With real-time ambulance tracking and ETA prediction, emergency care becomes faster and life-saving decisions get smarter.",
          },
          {
            icon: <FaHospitalAlt size={36} className="text-purple-600 mb-2" />,
            title: "Hospital Partnerships",
            desc: "Hospitals use DiagnostiQ to digitize patient intake, automate report analysis, and improve patient triaging.",
          },
          {
            icon: <FaBrain size={36} className="text-purple-600 mb-2" />,
            title: "AI-Driven Disease Detection",
            desc: "Our ML engine learns continuously from medical datasets to enhance prediction accuracy for complex conditions.",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl text-center transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
          >
            {card.icon}
            <h3 className="text-xl font-semibold text-purple-600 mb-2">{card.title}</h3>
            <p className="text-gray-700">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Future Scope */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 mt-16 max-w-4xl w-full bg-white p-8 rounded-3xl shadow-2xl border-l-8 border-purple-600"
      >
        <h3 className="text-3xl font-bold text-purple-600 mb-4">Future Scope & Vision</h3>
        <ul className="text-gray-700 space-y-4 list-disc pl-6 text-left">
          <li>
            <strong>Subscription Plans</strong> for premium users to access advanced reports, personal health dashboards, and 24/7 chatbot support.
          </li>
          <li>
            <strong>Doctor-On-Demand</strong>: Integration with certified doctors for instant virtual consultations and prescriptions.
          </li>
          <li>
            <strong>Global Hospital Network</strong>: Expansion of partnerships with hospitals for real-time diagnosis, referral systems, and patient routing.
          </li>
          <li>
            <strong>Smart Ambulance Ecosystem</strong>: AI-based ambulance routing with real-time traffic/weather integration and hospital availability prediction.
          </li>
          <li>
            <strong>Voice & Multilingual Support</strong> for rural and underserved areas to break barriers in digital healthcare access.
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default About;
