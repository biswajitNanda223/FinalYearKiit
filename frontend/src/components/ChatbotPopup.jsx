import { useState, useEffect, useRef } from "react";
import { chatWithAI } from "../services/api"; // Ensure API function works

function ChatbotPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "Male",
        chatType: "Diet Plan",
    });
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetChat = () => {
        setStep(1);
        setFormData({ name: "", age: "", gender: "Male", chatType: "Diet Plan" });
        setMessages([]);
        setInput("");
        setIsOpen(false);
    };

    const startChat = () => {
        if (!formData.name || !formData.age) {
            alert("Please fill in all details.");
            return;
        }
        setStep(2);
        setMessages([
            { role: "bot", content: `Hello ${formData.name}! Let's start your ${formData.chatType.toLowerCase()} session.` },
            { role: "bot", content: "What is your primary health concern?" },
        ]);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);

        if (input.toLowerCase().includes("thank you")) {
            setTimeout(() => {
                resetChat();
            }, 1000);
            return;
        }

        let botResponse = "";

        if (messages.length === 1) {
            botResponse = "Got it! How often do you exercise per week?";
        } else if (messages.length === 3) {
            botResponse = "Thanks! Do you have any dietary restrictions?";
        } else if (messages.length === 5) {
            botResponse = `Thanks for the info, ${formData.name}! Here's my advice: **Eat balanced meals, stay hydrated, and exercise regularly!** 🏋️‍♂️`;
        } else {
            const fullMessage = `User Info: Name - ${formData.name}, Age - ${formData.age}, Gender - ${formData.gender}, Chat Type - ${formData.chatType}. User Query: ${input}`;
            const response = await chatWithAI(fullMessage);
            botResponse = response.botResponse;
        }

        setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
        setInput("");
    };

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <button 
                onClick={toggleChat} 
                className="fixed bottom-6 right-6 bg-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-110 z-50"
            >
                💬
            </button>

            {isOpen && (
                <div className="fixed bottom-20 right-6 w-96 bg-white shadow-2xl rounded-xl overflow-hidden transition-all z-50 border border-gray-300">
                    <div className="bg-purple-600 text-white px-4 py-3 flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Chatbot</h3>
                        <button onClick={toggleChat} className="text-white text-lg font-bold hover:opacity-80">✖</button>
                    </div>

                    <div className="p-4 space-y-3">
                        {step === 1 ? (
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold">Enter Your Details</h3>
                                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none" />
                                <input type="number" name="age" placeholder="Your Age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none" />
                                <button onClick={startChat} className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">Start Chat</button>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <div ref={chatRef} className="h-72 overflow-y-auto bg-gray-100 p-3 rounded-md space-y-2">
                                    {messages.map((msg, index) => (
                                        <div key={index} className={`p-2 rounded-lg text-sm max-w-4/5 ${msg.role === "user" ? "bg-purple-500 text-white ml-auto" : "bg-gray-300 text-gray-800"}`}>
                                            {msg.content}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center mt-2">
                                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none" />
                                    <button onClick={sendMessage} className="ml-2 bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition">Send</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatbotPopup;
