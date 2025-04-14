import React, { useState } from "react";
import { predictDiabetes } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { CheckCircle, AlertCircle } from "lucide-react";

const initialState = {
  Pregnancies: '',
  Glucose: '',
  BloodPressure: '',
  SkinThickness: '',
  Insulin: '',
  BMI: '',
  DiabetesPedigreeFunction: '',
  Age: ''
};

const normalRanges = {
  Pregnancies: 3,
  Glucose: 120,
  BloodPressure: 80,
  SkinThickness: 20,
  Insulin: 80,
  BMI: 25,
  DiabetesPedigreeFunction: 0.5,
  Age: 35
};

const DiabetesForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [chartType, setChartType] = useState("bar");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await predictDiabetes(formData);

    if (response?.prediction === 1) {
      setResult("Diabetic");
      setSnackbarMessage("\u26a0\ufe0f High risk of diabetes detected.");
    } else if (response?.prediction === 0) {
      setResult("Not Diabetic");
      setSnackbarMessage("\u2705 You are not diabetic. Keep up the good health!");
    } else {
      setResult("Unknown");
      setSnackbarMessage("Error occurred during prediction.");
    }

    setConfidence(response?.confidence ?? null);
    setLoading(false);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 4000);
  };

  const chartData = Object.keys(initialState).map((key) => ({
    name: key,
    You: Number(formData[key]) || 0,
    Normal: Number(normalRanges[key])
  }));

  const isDataFilled = Object.values(formData).every((val) => val !== '' && !isNaN(parseFloat(val)));

  const confidenceData = confidence !== null ? [
    { name: "Confidence", value: confidence * 100 },
    { name: "Uncertainty", value: 100 - confidence * 100 }
  ] : [];

  const COLORS = ["#9333ea", "#ddd6fe"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-purple-100 to-purple-50 p-6 md:p-10 rounded-3xl shadow-2xl max-w-5xl w-full mx-auto mt-10"
    >
      <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-4">
        🧨 Diabetes Risk Predictor
      </h1>
      <p className="text-center text-gray-600 mb-8 text-base md:text-lg">
        Enter your health parameters and visualize your diabetes risk compared to normal levels.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {Object.keys(initialState).map((key) => (
          <input
            key={key}
            type="number"
            name={key}
            placeholder={key}
            value={formData[key]}
            onChange={handleChange}
            className="p-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm"
            required
          />
        ))}
        <div className="col-span-full">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 text-white py-3 rounded-xl hover:bg-purple-800 transition font-bold text-lg shadow-md"
          >
            {loading ? "Predicting..." : "Predict Now"}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showSnackbar && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-sm"
          >
            {snackbarMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 bg-white p-6 md:p-8 rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            {result === "Diabetic" ? (
              <AlertCircle className="text-red-600 w-6 h-6" />
            ) : (
              <CheckCircle className="text-green-600 w-6 h-6" />
            )}
            <h2 className={`text-2xl font-bold ${result === "Diabetic" ? "text-red-600" : "text-green-600"}`}>
              Result: {result}
            </h2>
          </div>

          {confidence !== null && (
            <div className="w-full flex justify-center mb-6">
              <div style={{ width: 300, height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={confidenceData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      label
                    >
                      {confidenceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {isDataFilled && (
            <>
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setChartType(chartType === "bar" ? "radar" : "bar")}
                  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg shadow hover:bg-purple-200 transition"
                >
                  Switch to {chartType === "bar" ? "Radar Chart" : "Bar Chart"}
                </button>
              </div>

              <div style={{ height: 400, width: '100%' }}>
                <ResponsiveContainer>
                  {chartType === "bar" ? (
                    <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="You" fill="#9333ea" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="Normal" fill="#c4b5fd" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  ) : (
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Radar name="You" dataKey="You" stroke="#9333ea" fill="#9333ea" fillOpacity={0.6} />
                      <Radar name="Normal" dataKey="Normal" stroke="#c4b5fd" fill="#c4b5fd" fillOpacity={0.5} />
                    </RadarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default DiabetesForm;
