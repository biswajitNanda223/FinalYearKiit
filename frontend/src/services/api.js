import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Change this if you're using a different base URL

// ✅ Register User (CustomUser)
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration API Error:", error.response?.data || error);
    return { error: error.response?.data?.message || "Registration failed" };
  }
};

// ✅ Login User
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, credentials);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Login failed" };
  }
};

// ✅ Logout User
export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/logout/`);
    localStorage.removeItem("user");
    return { message: "Logged out successfully" };
  } catch (error) {
    return { error: "Logout failed" };
  }
};

// ✅ Get User Profile
export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}/`);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Failed to fetch user profile" };
  }
};

// ✅ Disease Prediction (NLP-based)
export const predictDisease = async (symptoms) => {
  try {
    const response = await axios.post(`${API_URL}/predict-disease/`, { symptoms });
    return {
      predictedDisease: response.data.predicted_disease,
      suggestedDoctors: response.data.suggested_doctors || [],
    };
  } catch (error) {
    console.error("Error predicting disease:", error);
    return { predictedDisease: null, suggestedDoctors: [] };
  }
};

// ✅ AI Chat Assistant
export const chatWithAI = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/chat/`, { message });
    return {
      botResponse: response.data.response || "No response from chatbot",
    };
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return { botResponse: "Chatbot is currently unavailable" };
  }
};

// ✅ Diabetes Prediction (SVM Model)
export const predictDiabetes = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/predict/`, formData);
    return {
      prediction: response.data.prediction // return 1 or 0 as-is
    };
  } catch (error) {
    console.error("Diabetes Prediction Error:", error);
    return { prediction: null }; // or use a different error code
  }
};


// ✅ Contact Form Submission
export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/contact/`, formData);
    return { message: "Message sent successfully", data: response.data };
  } catch (error) {
    console.error("Contact Form API Error:", error.response?.data || error);
    return { error: "Failed to send message" };
  }
};
