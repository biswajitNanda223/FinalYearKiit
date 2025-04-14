import { useState } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

const HealthTools = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState("");

  const [caloriesIn, setCaloriesIn] = useState("");
  const [caloriesOut, setCaloriesOut] = useState("");
  const [calorieAdvice, setCalorieAdvice] = useState("");

  const [waterWeight, setWaterWeight] = useState("");
  const [waterIntake, setWaterIntake] = useState("");

  const [sleepHours, setSleepHours] = useState("");
  const [sleepAdvice, setSleepAdvice] = useState("");

  // BMI Calculator
  const calculateBMI = () => {
    if (weight && height) {
      const bmiValue = (weight / (height * height)).toFixed(2);
      setBmi(bmiValue);
      if (bmiValue < 18.5) setBmiStatus("Underweight 😕 (Eat more & exercise)");
      else if (bmiValue < 24.9) setBmiStatus("Healthy 😊 (Keep it up!)");
      else if (bmiValue < 29.9) setBmiStatus("Overweight 🤔 (Consider exercising)");
      else setBmiStatus("Obese 😟 (Consult a doctor)");
    }
  };

  // Calorie Tracker
  const trackCalories = () => {
    if (caloriesIn && caloriesOut) {
      const netCalories = caloriesIn - caloriesOut;
      let advice = "";
      if (netCalories > 500) advice = "You're consuming too many calories! 🛑";
      else if (netCalories < -500) advice = "You're burning more than eating! ⚠️";
      else advice = "Your calorie balance is good! ✅";
      setCalorieAdvice(advice);
    }
  };

  // Water Intake Calculator
  const calculateWaterIntake = () => {
    if (waterWeight) {
      const intake = (waterWeight * 0.033).toFixed(2);
      setWaterIntake(`Recommended: ${intake} liters/day 💧`);
    }
  };

  // Sleep Cycle Analyzer
  const analyzeSleep = () => {
    if (sleepHours < 5) setSleepAdvice("You need more sleep! Aim for 7-9 hours. 😴");
    else if (sleepHours >= 5 && sleepHours < 7) setSleepAdvice("Try to sleep a bit more! 🌙");
    else setSleepAdvice("Great! You're getting proper rest. 🛌");
  };

  return (
    <div className="py-12 sm:py-20 bg-gradient-to-br from-purple-100 to-blue-200 text-center">
      <motion.h2 
        className="text-4xl sm:text-5xl font-bold text-purple-800 mb-6 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🏥 Health Assistant Tools
      </motion.h2>
      <p className="text-gray-700 text-lg sm:text-xl mb-10 px-4 sm:px-16">
        Track your **BMI, Calories, Water Intake, and Sleep** to stay healthy! 🚀
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-12">
        {/* Health Tool Cards */}
        {[{
          title: "BMI Calculator 🏋️",
          tooltip: "Enter weight (kg) & height (m) to check your BMI.",
          inputs: [
            { placeholder: "Weight (kg)", value: weight, onChange: (e) => setWeight(e.target.value) },
            { placeholder: "Height (m)", value: height, onChange: (e) => setHeight(e.target.value) }
          ],
          action: calculateBMI,
          result: bmi ? `BMI: ${bmi} → ${bmiStatus}` : "",
        }, {
          title: "Calorie Tracker 🍽️",
          tooltip: "Enter consumed & burned calories to check your balance.",
          inputs: [
            { placeholder: "Calories In", value: caloriesIn, onChange: (e) => setCaloriesIn(e.target.value) },
            { placeholder: "Calories Out", value: caloriesOut, onChange: (e) => setCaloriesOut(e.target.value) }
          ],
          action: trackCalories,
          result: calorieAdvice,
        }, {
          title: "Water Intake 💧",
          tooltip: "Enter your weight to check daily water needs.",
          inputs: [
            { placeholder: "Weight (kg)", value: waterWeight, onChange: (e) => setWaterWeight(e.target.value) }
          ],
          action: calculateWaterIntake,
          result: waterIntake,
        }, {
          title: "Sleep Cycle 💤",
          tooltip: "Enter the hours you slept last night for sleep advice.",
          inputs: [
            { placeholder: "Hours Slept", value: sleepHours, onChange: (e) => setSleepHours(e.target.value) }
          ],
          action: analyzeSleep,
          result: sleepAdvice,
        }].map((tool, index) => (
          <motion.div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-lg text-center border-l-8 border-purple-500 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tooltip Icon */}
            <div className="absolute top-3 right-3">
              <span className="cursor-pointer text-gray-500 text-lg" data-tooltip-id={`tooltip-${index}`}>
                ℹ️
              </span>
              <Tooltip id={`tooltip-${index}`} place="top" effect="solid">
                {tool.tooltip}
              </Tooltip>
            </div>

            <h3 className="text-xl font-semibold text-purple-900 mb-2">{tool.title}</h3>
            
            {tool.inputs.map((input, i) => (
              <input 
                key={i} 
                type="number" 
                placeholder={input.placeholder} 
                value={input.value} 
                onChange={input.onChange} 
                className="block w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-purple-500 shadow-md transition"
              />
            ))}

            <motion.button 
              onClick={tool.action} 
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-transform active:scale-90"
              whileHover={{ scale: 1.1 }}
            >
              Check Now
            </motion.button>

            {tool.result && (
              <motion.p 
                className="mt-4 text-lg font-semibold text-indigo-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {tool.result}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HealthTools;
