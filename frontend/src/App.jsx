import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SymptomChecker from "./pages/SymptomChecker";
import MedicalReportNER from "./pages/MedicalReportNER";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import PopupModal from "./pages/PopupModal";
import "./index.css";
import ChatbotPopup from "./components/ChatbotPopup";
import HealthTools from "./components/HealthTools";
import diabetesForm from "./pages/DiabetesForm";
import DiabetesForm from "./pages/DiabetesForm";


const App = () => {
  return (
    <Router> {/* Router should wrap everything */}
      <AuthProvider>
        <Navbar />
        <PopupModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/medical-report-ner" element={<MedicalReportNER />} />
          <Route path="/health-tools" element={<HealthTools />} />
          <Route path="/diabetes-form" element={<DiabetesForm />} />
          {/* Add more routes as needed */}
        </Routes>
        <ChatbotPopup/>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
