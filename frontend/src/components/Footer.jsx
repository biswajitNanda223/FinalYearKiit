import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/footer.json"; // Ensure this file exists

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-purple-400 bg-opacity-90 backdrop-blur-xl shadow-lg border-t border-purple-300 text-white py-2 px-6 flex flex-col md:flex-row justify-between items-center">
      {/* Lottie Animation */}
      <div className="w-16 h-16">
        <Player autoplay loop src={animationData} />
      </div>

      {/* Footer Text */}
      <p className="text-xs md:text-sm font-semibold text-center md:text-left">
        © {new Date().getFullYear()} HealthAI. All rights reserved.
      </p>

      {/* Social Links (Optional) */}
      <div className="flex space-x-2 text-xs md:text-sm mt-2 md:mt-0">
        <a href="#" className="hover:text-gray-200 transition duration-300">Facebook</a>
        <a href="#" className="hover:text-gray-200 transition duration-300">Twitter</a>
        <a href="#" className="hover:text-gray-200 transition duration-300">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
