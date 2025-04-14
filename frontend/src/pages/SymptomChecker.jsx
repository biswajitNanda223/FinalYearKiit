import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserMd } from "react-icons/fa";
import { predictDisease } from "../services/api";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await predictDisease(symptoms);
      setResult(response);
    } catch (error) {
      console.error("Error:", error);
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-purple-50 mt-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-purple-200"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-700 text-center mb-4">
          🩺 Symptom Checker
        </h2>
        <p className="text-gray-600 text-center mb-6 text-lg">
          Enter your symptoms to receive a disease prediction and doctor suggestions.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <textarea
            className="border-2 border-purple-400 bg-purple-50 p-4 rounded-xl w-full text-base focus:ring-4 focus:ring-purple-200 shadow-sm resize-none min-h-[120px] transition-all duration-200"
            placeholder="E.g. Fever, headache, cough..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-full transition text-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            {loading ? "Checking..." : "Check Symptoms"}
          </button>
        </form>
      </motion.div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 w-full max-w-5xl bg-white p-10 rounded-3xl shadow-2xl border border-purple-200"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-purple-700 mb-4">
            Predicted Disease:
          </h3>
          <p className="text-xl font-semibold text-gray-800 bg-purple-100 p-4 rounded-xl shadow-inner">
            {result.predictedDisease || "Not found"}
          </p>

          {result.suggestedDoctors.length > 0 && (
            <div className="mt-10">
              <h4 className="text-xl font-semibold text-purple-600 mb-4">Suggested Doctors</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-purple-300 rounded-xl overflow-hidden shadow-sm">
                  <thead className="bg-purple-100 text-purple-800 text-left">
                    <tr>
                      <th className="py-3 px-5">Doctor</th>
                      <th className="py-3 px-5">Hospital</th>
                      <th className="py-3 px-5">Experience</th>
                      <th className="py-3 px-5">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.suggestedDoctors.map((doctor, index) => (
                      <tr
                        key={index}
                        className="hover:bg-purple-50 transition border-t border-purple-100"
                      >
                        <td className="py-4 px-5 flex items-center gap-3 font-medium text-gray-800">
                          <FaUserMd className="text-purple-600 text-lg" />
                          {doctor.name}
                        </td>
                        <td className="py-4 px-5 text-gray-600">{doctor.hospital}</td>
                        <td className="py-4 px-5 text-gray-600">{doctor.experience} years</td>
                        <td className="py-4 px-5 text-gray-600">{doctor.contact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SymptomChecker;
