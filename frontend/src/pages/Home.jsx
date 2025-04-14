import { Link, useNavigate } from "react-router-dom";
import { FaHeartbeat, FaStethoscope, FaSyringe, FaPlus, FaPills } from "react-icons/fa";
import {
    Hospital
} from "lucide-react";

import { Player } from "@lottiefiles/react-lottie-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import animationData from "../assets/2.json";

// const Home = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="relative w-full min-h-screen text-gray-900 overflow-x-hidden bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-100">

//             {/* Floating Healthcare Icons */}
//             <div className="absolute top-20 left-0 animate-floatIcon1">
//                 <FaStethoscope className="text-gray-600 text-6xl" />
//             </div>
//             <div className="absolute bottom-24 right-10 animate-floatIcon2">
//                 <FaSyringe className="text-gray-600 text-6xl" />
//             </div>
//             <div className="absolute top-1/4 right-10 animate-floatIcon3">
//                 <FaPlus className="text-gray-600 text-6xl" />
//             </div>
//             <div className="absolute bottom-40 left-14 animate-floatIcon4">
//                 <FaPills className="text-gray-600 text-6xl" />
//             </div>

//             {/* Hero Section */}
//             <div className="relative flex flex-wrap items-center justify-center min-h-screen px-4 sm:px-10 pt-8 sm:pt-24 transition-all ease-in-out duration-500 hover:scale-105">
//                 <div
//                     className="absolute inset-0 w-full lg:w-1/2 h-full bg-cover bg-center clip-hero-shape transition-transform duration-700 hover:scale-105"
//                     style={{ backgroundImage: "url('/assets/md2.jpg')" }}
//                 ></div>

//                 <div className="relative z-10 flex flex-wrap items-center justify-center w-full max-w-6xl">
//                     <div className="hidden sm:flex w-full md:w-1/2 justify-center mb-6 sm:mb-0">
//                         <Player autoplay loop src={animationData} className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl" style={{ height: "auto", width: "100%" }} />
//                     </div>

//                     <div className="w-full md:w-1/2 text-center md:text-left px-6">
//                         <div className="bg-white bg-opacity-70 p-4 rounded-lg block sm:hidden mb-4">
//                             <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-purple-700 transition-all duration-500 hover:text-purple-500">
//                                 Your AI-Powered <span className="text-purple-500">Health Companion</span>
//                             </h1>
//                             <p className="text-base sm:text-lg mt-2 text-gray-700">
//                                 Get accurate symptom analysis, medical report insights, and AI-powered health predictions.
//                             </p>
//                         </div>

//                         <div className="hidden sm:block">
//                             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-purple-700 transition-all duration-500 hover:text-purple-500">
//                                 Your AI-Powered <span className="text-purple-500">Health Companion</span>
//                             </h1>
//                             <p className="text-base sm:text-lg mt-4 text-gray-700 max-w-xl mx-auto md:mx-0">
//                                 Get accurate symptom analysis, medical report insights, and AI-powered health predictions.
//                             </p>
//                         </div>

//                         <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-6">
//                             <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-xl transition w-full sm:w-auto hover:scale-105">
//                                 <Link to="/symptom-checker">Check Symptoms</Link>
//                             </button>
//                             <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold shadow-xl transition w-full sm:w-auto hover:scale-105">
//                                 <Link to="/medical-report-ner">Analyze Reports</Link>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Services Section */}
//             <section className="relative z-10 py-10 sm:py-20 bg-light-purple transition-all duration-700 hover:bg-purple-200">
//                 <h2 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-10">Our Services</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-10">
//                     {["Symptom Analysis", "Medical Report Insights", "AI Health Predictions", "Doctor Consultations", "Wellness Tips", "Emergency Assistance"].map((service, index) => (
//                         <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-500">
//                             <FaHeartbeat className="text-purple-600 text-3xl sm:text-4xl mb-4 mx-auto" />
//                             <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{service}</h3>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Blog Section */}
//             <section className="py-10 sm:py-20 bg-gray-100 transition-all duration-500 hover:bg-gray-200">
//                 <h2 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-10">Health & Wellness Blog</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-10">
//                     {[
//                         { title: "Understanding Diabetes Symptoms", content: "Learn the early warning signs of diabetes, including frequent thirst, fatigue, and blurred vision." },
//                         { title: "Healthy Diet Plans for Weight Loss", content: "Discover effective and balanced diet plans that can help you achieve your weight loss goals without compromising nutrition." },
//                         { title: "Common Cold vs. Flu: Know the Difference", content: "Understand the key differences between a common cold and flu, and when to seek medical attention." },
//                         { title: "Heart Health: Tips for a Stronger Heart", content: "Explore daily habits that promote heart health, including exercise, balanced nutrition, and stress management." },
//                         { title: "The Importance of Hydration", content: "Discover why staying hydrated is crucial for your overall health and how much water you should be drinking daily." },
//                         { title: "Managing Stress for Better Health", content: "Learn simple yet effective stress management techniques to improve mental and physical well-being." }
//                     ].map((blog, index) => (
//                         <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl">
//                             <h3 className="text-xl font-semibold text-gray-800 mb-3">{blog.title}</h3>
//                             <p className="text-gray-700 text-sm">{blog.content}</p>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//             {/* 🚀 Feature Highlights Section */}
//             <section className="py-16 bg-white text-center">
//                 <h2 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-4">What DiagnostiQ Offers</h2>
//                 <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-base sm:text-lg">
//                     An all-in-one intelligent health companion powered by AI to help you diagnose, analyze and act quickly.
//                 </p>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
//                     {[
//                         { icon: "🧠", title: "Symptom Checker", desc: "Enter symptoms and get instant disease predictions." },
//                         { icon: "📄", title: "Medical Report NER", desc: "AI reads your medical reports and extracts key info." },
//                         { icon: "🔍", title: "Disease Prediction", desc: "Get likely diagnoses using machine learning models." },
//                         { icon: "💊", title: "Medicine Suggestions", desc: "AI-recommended medicines for your condition." },
//                         { icon: "🛒", title: "Buy Link Comparison", desc: "Compare prices from 1mg, Netmeds, and PharmEasy." },
//                         { icon: "🤖", title: "Chatbot Assistant", desc: "Friendly bot to guide your health queries 24x7." },
//                         { icon: "👨‍⚕️", title: "Doctor Recommendations", desc: "Connect to nearby or suggested health experts." },
//                     ].map((feature, idx) => (
//                         <div
//                             key={idx}
//                             className="bg-purple-50 border border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-transform duration-300 hover:scale-105"
//                         >
//                             <div className="text-5xl mb-4">{feature.icon}</div>
//                             <h3 className="text-xl font-semibold text-purple-800 mb-2">{feature.title}</h3>
//                             <p className="text-gray-600 text-sm">{feature.desc}</p>
//                         </div>
//                     ))}
//                 </div>
//             </section>


//             {/* Featured Health Tools */}
//             <section className="py-10 sm:py-20 bg-white text-center transition-all duration-500 hover:bg-purple-100">
//                 <h2 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-10">Featured Health Tools</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-10">
//                     {["BMI Calculator", "Calorie Tracker", "Water Intake Reminder", "Sleep Cycle Analyzer"].map((tool, index) => (
//                         <div key={index} className="bg-purple-100 p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-all duration-500">
//                             <h3 className="text-lg sm:text-xl font-semibold text-purple-800">{tool}</h3>
//                         </div>
//                     ))}
//                 </div>
//                 <button
//                     onClick={() => navigate("/health-tools")}
//                     className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition hover:scale-105"
//                 >
//                     Explore Health Tools
//                 </button>
//             </section>

//             {/* Patient Testimonials */}
//             <section className="py-10 sm:py-20 bg-gray-100 text-center transition-all duration-500 hover:bg-gray-200">
//                 <h2 className="text-3xl sm:text-4xl font-bold text-purple-600 mb-10">
//                     Patient Testimonials & Success Stories
//                 </h2>
//                 <div className="max-w-4xl mx-auto">
//                     <Swiper
//                         modules={[Pagination, Autoplay]}
//                         spaceBetween={30}
//                         slidesPerView={1}
//                         loop={true}
//                         pagination={{ clickable: true }}
//                         autoplay={{ delay: 3000 }}
//                         className="pb-10"
//                     >
//                         {[
//                             "This AI-powered symptom checker helped me detect early signs of a condition I wouldn't have noticed otherwise!",
//                             "The medical report insights feature saved me time and gave me a better understanding of my health status.",
//                             "Accurate predictions and an easy-to-use interface—truly a lifesaver!",
//                         ].map((testimonial, index) => (
//                             <SwiperSlide key={index}>
//                                 <div className="p-6 sm:p-8 bg-white rounded-xl shadow-xl max-w-2xl mx-auto border-l-4 border-purple-600 transition-all duration-500 hover:shadow-xl">
//                                     <p className="text-purple-600 text-lg sm:text-xl font-medium leading-relaxed">
//                                         "{testimonial}"
//                                     </p>
//                                 </div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>
//             </section>

//             {/* 🚨 Enhanced Section: Diabetes Risk Detection (Optimized for PNG Icon) */}
//             <section className="py-14 sm:py-24 bg-gradient-to-br from-purple-50 to-purple-100 text-center transition-all duration-500">
//                 <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-6 drop-shadow-sm">
//                     Early Diabetes Risk Detection
//                 </h2>
//                 <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto mb-10">
//                     Predict your diabetes risk instantly using our AI-powered analyzer. No lab tests required—just answer a few simple questions.
//                 </p>

//                 <div className="flex flex-col sm:flex-row items-center justify-center gap-10 px-6">
//                     <div className="relative group w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center bg-white rounded-full shadow-lg border border-purple-200 transition-transform duration-300 hover:scale-105">
//                         <img
//                             src="/src/assets/diabetes-test_15192994.png"
//                             alt="Diabetes Risk Icon"
//                             className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
//                         />
//                         <div className="absolute inset-0 rounded-full bg-purple-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
//                     </div>

//                     <div className="text-left max-w-xl">
//                         <h3 className="text-2xl font-semibold text-purple-800 mb-4">Why Check Now?</h3>
//                         <ul className="list-disc list-inside text-gray-700 space-y-2">
//                             <li>Identify risk early and take preventive measures</li>
//                             <li>100% anonymous and secure</li>
//                             <li>Powered by clinical datasets and machine learning</li>
//                         </ul>
//                         <button
//                             onClick={() => navigate("/diabetes-checker")}
//                             className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:scale-105"
//                         >
//                             Check Your Diabetes Risk
//                         </button>
//                     </div>
//                 </div>
//             </section>


//             {/* 🏥 Hospitals Onboard Section using Lucide Icons */}
//             <section className="py-16 bg-white text-center">
//                 <h2 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-4">
//                     Trusted by Leading Hospitals
//                 </h2>
//                 <p className="text-gray-600 text-base sm:text-lg mb-10 max-w-3xl mx-auto">
//                     DiagnostiQ is already being used and recommended by top healthcare institutions across India.
//                 </p>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 px-6 max-w-6xl mx-auto items-center">
//                     <div className="bg-purple-50 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
//                         <div className="flex justify-center mb-3">
//                             <Hospital className="w-12 h-12 text-purple-600" />
//                         </div>
//                         <p className="text-sm font-semibold text-purple-700">Apollo Hospitals</p>
//                     </div>
//                     <div className="bg-purple-50 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
//                         <div className="flex justify-center mb-3">
//                             <Hospital className="w-12 h-12 text-purple-600" />
//                         </div>
//                         <p className="text-sm font-semibold text-purple-700">Fortis Healthcare</p>
//                     </div>
//                     <div className="bg-purple-50 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
//                         <div className="flex justify-center mb-3">
//                             <Hospital className="w-12 h-12 text-purple-600" />
//                         </div>
//                         <p className="text-sm font-semibold text-purple-700">AIIMS Delhi</p>
//                     </div>
//                     <div className="bg-purple-50 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
//                         <div className="flex justify-center mb-3">
//                             <Hospital className="w-12 h-12 text-purple-600" />
//                         </div>
//                         <p className="text-sm font-semibold text-purple-700">KIMS</p>
//                     </div>
//                     <div className="bg-purple-50 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
//                         <div className="flex justify-center mb-3">
//                             <Hospital className="w-12 h-12 text-purple-600" />
//                         </div>
//                         <p className="text-sm font-semibold text-purple-700">CARE Hospitals</p>
//                     </div>
//                 </div>
//             </section>



//             {/* ✅ Trust Badges Section */}
//             <section className="py-12 bg-purple-50">
//                 <div className="max-w-6xl mx-auto px-6 text-center">
//                     <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-8">
//                         Why Trust DiagnostiQ?
//                     </h2>

//                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
//                         {[
//                             { icon: "🧬", label: "Powered by ML" },
//                             { icon: "🔒", label: "Secure & Anonymous" },
//                             { icon: "🧠", label: "Trained on Clinical Data" },
//                             { icon: "⚡", label: "Instant Results" },
//                             { icon: "🌐", label: "Access Anywhere" },
//                             { icon: "👨‍⚕️", label: "Doctor Reviewed" },
//                         ].map((badge, idx) => (
//                             <div
//                                 key={idx}
//                                 className="bg-white rounded-xl border border-purple-100 p-4 shadow-md hover:shadow-lg transition transform hover:scale-105"
//                             >
//                                 <div className="text-3xl mb-2">{badge.icon}</div>
//                                 <p className="text-sm font-medium text-gray-700">{badge.label}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>


//         </div>
//     );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            setShowLoginPopup(true);
            setSnackbarOpen(true);
        }
    }, [user]);

    const handleSnackbarClose = () => setSnackbarOpen(false);

    const LoginPopup = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl animate-fade-in">
                <div className="bg-gradient-to-r from-purple-800 to-indigo-700 text-white p-6 rounded-t-3xl text-center">
                    <h2 className="text-3xl font-bold">🔒 Access Restricted</h2>
                    <p className="mt-2 text-lg font-medium">
                        Please log in to explore the full potential of <span className="font-bold">DiagnostiQ</span>.
                    </p>
                </div>
                <div className="p-8 space-y-6 text-center">
                    <p className="text-gray-600">
                        Unlock features like Symptom Checker, Report Analysis, and more—your health insights await!
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300"
                    >
                        🚀 Proceed to Login
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative w-full min-h-screen text-gray-900 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-100">
            {/* Snackbar Notification */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={7000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity="warning"
                    sx={{
                        backgroundColor: "#7e22ce",
                        color: "white",
                        fontSize: "1rem",
                        borderRadius: "12px",
                        fontWeight: "500",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                        "@media (max-width: 640px)": {
                            width: "90vw",
                            margin: "0 auto",
                        },
                    }}
                >
                    Please log in to access DiagnostiQ's smart health services.
                </MuiAlert>
            </Snackbar>

            {/* Login Popup */}
            {showLoginPopup && <LoginPopup />}

            {/* Hero Section */}
            <div className="relative w-full min-h-screen text-gray-900 overflow-x-hidden bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-100">

                {/* Floating Healthcare Icons */}
                <div className="absolute top-20 left-0 animate-floatIcon1">
                    <FaStethoscope className="text-gray-600 text-6xl" />
                </div>
                <div className="absolute bottom-24 right-10 animate-floatIcon2">
                    <FaSyringe className="text-gray-600 text-6xl" />
                </div>
                <div className="absolute top-1/4 right-10 animate-floatIcon3">
                    <FaPlus className="text-gray-600 text-6xl" />
                </div>
                <div className="absolute bottom-40 left-14 animate-floatIcon4">
                    <FaPills className="text-gray-600 text-6xl" />
                </div>

                {/* Hero Section */}
                <div className="relative flex flex-wrap items-center justify-center min-h-screen px-4 sm:px-10 pt-8 sm:pt-24 transition-all ease-in-out duration-500 hover:scale-105">
                    <div
                        className="absolute inset-0 w-full lg:w-1/2 h-full bg-cover bg-center clip-hero-shape transition-transform duration-700 hover:scale-105"
                        style={{ backgroundImage: "url('/assets/md2.jpg')" }}
                    ></div>

                    <div className="relative z-10 flex flex-wrap items-center justify-center w-full max-w-6xl">
                        <div className="hidden sm:flex w-full md:w-1/2 justify-center mb-6 sm:mb-0">
                            <Player autoplay loop src={animationData} className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl" style={{ height: "auto", width: "100%" }} />
                        </div>

                        <div className="w-full md:w-1/2 text-center md:text-left px-6">
                            <div className="bg-white bg-opacity-70 p-4 rounded-lg block sm:hidden mb-4">
                                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-purple-700 transition-all duration-500 hover:text-purple-500">
                                    Your AI-Powered <span className="text-purple-500">Health Companion</span>
                                </h1>
                                <p className="text-base sm:text-lg mt-2 text-gray-700">
                                    Get accurate symptom analysis, medical report insights, and AI-powered health predictions.
                                </p>
                            </div>

                            <div className="hidden sm:block">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-purple-700 transition-all duration-500 hover:text-purple-500">
                                    Your AI-Powered <span className="text-purple-500">Health Companion</span>
                                </h1>
                                <p className="text-base sm:text-lg mt-4 text-gray-700 max-w-xl mx-auto md:mx-0">
                                    Get accurate symptom analysis, medical report insights, and AI-powered health predictions.
                                </p>
                            </div>

                            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-6">
                                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-xl transition w-full sm:w-auto hover:scale-105">
                                    <Link to="/symptom-checker">Check Symptoms</Link>
                                </button>
                                <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold shadow-xl transition w-full sm:w-auto hover:scale-105">
                                    <Link to="/medical-report-ner">Analyze Reports</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Section */}
                <section className="relative z-10 py-10 sm:py-20 bg-light-purple transition-all duration-700 hover:bg-purple-200">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-10">Our Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-10">
                        {["Symptom Analysis", "Medical Report Insights", "AI Health Predictions", "Doctor Consultations", "Wellness Tips", "Emergency Assistance"].map((service, index) => (
                            <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-500">
                                <FaHeartbeat className="text-purple-600 text-3xl sm:text-4xl mb-4 mx-auto" />
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{service}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Blog Section */}
                <section className="py-10 sm:py-20 bg-gray-100 transition-all duration-500 hover:bg-gray-200">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-10">Health & Wellness Blog</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-10">
                        {[
                            { title: "Understanding Diabetes Symptoms", content: "Learn the early warning signs of diabetes, including frequent thirst, fatigue, and blurred vision." },
                            { title: "Healthy Diet Plans for Weight Loss", content: "Discover effective and balanced diet plans that can help you achieve your weight loss goals without compromising nutrition." },
                            { title: "Common Cold vs. Flu: Know the Difference", content: "Understand the key differences between a common cold and flu, and when to seek medical attention." },
                            { title: "Heart Health: Tips for a Stronger Heart", content: "Explore daily habits that promote heart health, including exercise, balanced nutrition, and stress management." },
                            { title: "The Importance of Hydration", content: "Discover why staying hydrated is crucial for your overall health and how much water you should be drinking daily." },
                            { title: "Managing Stress for Better Health", content: "Learn simple yet effective stress management techniques to improve mental and physical well-being." }
                        ].map((blog, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">{blog.title}</h3>
                                <p className="text-gray-700 text-sm">{blog.content}</p>
                            </div>
                        ))}
                    </div>
                </section>
                {/* 🚀 Feature Highlights Section */}
                <section className="py-16 bg-white text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-4">What DiagnostiQ Offers</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-base sm:text-lg">
                        An all-in-one intelligent health companion powered by AI to help you diagnose, analyze and act quickly.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
                        {[
                            { icon: "🧠", title: "Symptom Checker", desc: "Enter symptoms and get instant disease predictions." },
                            { icon: "📄", title: "Medical Report NER", desc: "AI reads your medical reports and extracts key info." },
                            { icon: "🔍", title: "Disease Prediction", desc: "Get likely diagnoses using machine learning models." },
                            { icon: "💊", title: "Medicine Suggestions", desc: "AI-recommended medicines for your condition." },
                            { icon: "🛒", title: "Buy Link Comparison", desc: "Compare prices from 1mg, Netmeds, and PharmEasy." },
                            { icon: "🤖", title: "Chatbot Assistant", desc: "Friendly bot to guide your health queries 24x7." },
                            { icon: "👨‍⚕️", title: "Doctor Recommendations", desc: "Connect to nearby or suggested health experts." },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-purple-50 border border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-transform duration-300 hover:scale-105"
                            >
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-purple-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>


                {/* Featured Health Tools */}
                <section className="py-10 sm:py-20 bg-white text-center transition-all duration-500 hover:bg-purple-100">
                    <h2 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-10">Featured Health Tools</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-10">
                        {["BMI Calculator", "Calorie Tracker", "Water Intake Reminder", "Sleep Cycle Analyzer"].map((tool, index) => (
                            <div key={index} className="bg-purple-100 p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-all duration-500">
                                <h3 className="text-lg sm:text-xl font-semibold text-purple-800">{tool}</h3>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => navigate("/health-tools")}
                        className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition hover:scale-105"
                    >
                        Explore Health Tools
                    </button>
                </section>

                {/* Patient Testimonials */}
                <section className="py-10 sm:py-20 bg-gray-100 text-center transition-all duration-500 hover:bg-gray-200">
                    <h2 className="text-3xl sm:text-4xl font-bold text-purple-600 mb-10">
                        Patient Testimonials & Success Stories
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000 }}
                            className="pb-10"
                        >
                            {[
                                "This AI-powered symptom checker helped me detect early signs of a condition I wouldn't have noticed otherwise!",
                                "The medical report insights feature saved me time and gave me a better understanding of my health status.",
                                "Accurate predictions and an easy-to-use interface—truly a lifesaver!",
                            ].map((testimonial, index) => (
                                <SwiperSlide key={index}>
                                    <div className="p-6 sm:p-8 bg-white rounded-xl shadow-xl max-w-2xl mx-auto border-l-4 border-purple-600 transition-all duration-500 hover:shadow-xl">
                                        <p className="text-purple-600 text-lg sm:text-xl font-medium leading-relaxed">
                                            "{testimonial}"
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                {/* 🚨 Enhanced Section: Diabetes Risk Detection (Optimized for PNG Icon) */}
                <section className="py-14 sm:py-24 bg-gradient-to-br from-purple-50 to-purple-100 text-center transition-all duration-500">
                    <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-6 drop-shadow-sm">
                        Early Diabetes Risk Detection
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto mb-10">
                        Predict your diabetes risk instantly using our AI-powered analyzer. No lab tests required—just answer a few simple questions.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-10 px-6">
                        <div className="relative group w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center bg-white rounded-full shadow-lg border border-purple-200 transition-transform duration-300 hover:scale-105">
                            <img
                                src="/src/assets/diabetes-test_15192994.png"
                                alt="Diabetes Risk Icon"
                                className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                            />
                            <div className="absolute inset-0 rounded-full bg-purple-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        </div>

                        <div className="text-left max-w-xl">
                            <h3 className="text-2xl font-semibold text-purple-800 mb-4">Why Check Now?</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Identify risk early and take preventive measures</li>
                                <li>100% anonymous and secure</li>
                                <li>Powered by clinical datasets and machine learning</li>
                            </ul>
                            <button
                                onClick={() => navigate("/diabetes-form")}
                                className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:scale-105"
                            >
                                Check Your Diabetes Risk
                            </button>
                        </div>
                    </div>
                </section>


                {/* 🏥 Hospitals Onboard Section using Lucide Icons */}
                <section className="py-16 bg-white text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-4">
                        Trusted by Leading Hospitals
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg mb-10 max-w-3xl mx-auto">
                        DiagnostiQ is already being used and recommended by top healthcare institutions across India.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 px-6 max-w-6xl mx-auto items-center">
                        <div className="bg-purple-50 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
                            <div className="flex justify-center mb-3">
                                <Hospital className="w-12 h-12 text-purple-600" />
                            </div>
                            <p className="text-sm font-semibold text-purple-700">Apollo Hospitals</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
                            <div className="flex justify-center mb-3">
                                <Hospital className="w-12 h-12 text-purple-600" />
                            </div>
                            <p className="text-sm font-semibold text-purple-700">Fortis Healthcare</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
                            <div className="flex justify-center mb-3">
                                <Hospital className="w-12 h-12 text-purple-600" />
                            </div>
                            <p className="text-sm font-semibold text-purple-700">AIIMS Delhi</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
                            <div className="flex justify-center mb-3">
                                <Hospital className="w-12 h-12 text-purple-600" />
                            </div>
                            <p className="text-sm font-semibold text-purple-700">KIMS</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
                            <div className="flex justify-center mb-3">
                                <Hospital className="w-12 h-12 text-purple-600" />
                            </div>
                            <p className="text-sm font-semibold text-purple-700">CARE Hospitals</p>
                        </div>
                    </div>
                </section>



                {/* ✅ Trust Badges Section */}
                <section className="py-12 bg-purple-50">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-8">
                            Why Trust DiagnostiQ?
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                            {[
                                { icon: "🧬", label: "Powered by ML" },
                                { icon: "🔒", label: "Secure & Anonymous" },
                                { icon: "🧠", label: "Trained on Clinical Data" },
                                { icon: "⚡", label: "Instant Results" },
                                { icon: "🌐", label: "Access Anywhere" },
                                { icon: "👨‍⚕️", label: "Doctor Reviewed" },
                            ].map((badge, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-xl border border-purple-100 p-4 shadow-md hover:shadow-lg transition transform hover:scale-105"
                                >
                                    <div className="text-3xl mb-2">{badge.icon}</div>
                                    <p className="text-sm font-medium text-gray-700">{badge.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


            </div>
        </div>
    );
};

export default Home;




