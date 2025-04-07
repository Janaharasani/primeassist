"use client";
import { useState, useRef, useEffect } from "react";
import { FiSend, FiUser, FiSun, FiMoon, FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { BsThreeDotsVertical, BsArrowLeft } from "react-icons/bs";
import { RiRobot2Line } from "react-icons/ri";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date().toISOString()
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState("dark"); // Default to dark theme
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { 
      role: "user", 
      content: input,
      timestamp: new Date().toISOString()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { 
        ...data.response, 
        timestamp: new Date().toISOString() 
      }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-[90%] pt-2 pb-2 mx-auto" style={{ backgroundColor: '#000F2B' }}>
      <div className="text-center mt-20 mb-10">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center">
            <RiRobot2Line className="text-3xl text-blue-300" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Valet Parking Assistant
        </h1>
        <p className="mt-3 text-lg text-blue-200 max-w-md mx-auto">
          AI-powered instant reservations for stress-free luxury parking
        </p>
      </div>
      
      <div className={`w-[100%] h-[550px] relative top-6 mb-24 mx-auto rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${theme === 'dark' ? 'bg-blue-900 text-gray-100' : 'bg-white text-gray-800'}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between p-4 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-600'} text-white`}>
          <div className="flex items-center space-x-2">
            <RiRobot2Line className="text-xl" />
            <h1 className="font-semibold text-lg">AI Assistant</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleTheme}
              className="p-1 rounded-full hover:bg-opacity-20 hover:bg-white transition"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1 rounded-full hover:bg-opacity-20 hover:bg-white transition"
                aria-label="Menu"
              >
                <BsThreeDotsVertical />
              </button>
              {isMenuOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${theme === 'dark' ? 'bg-blue-900' : 'bg-white'} z-10`}>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-700 hover:text-white">Clear Conversation</a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Chat Window */}
        <div className={`flex-1 overflow-y-auto p-4 ${theme === 'dark' ? 'bg-blue-950' : 'bg-gray-50'}`}>
          {messages.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.role === "user" ? "flex justify-end" : "flex justify-start"}`}>
              <div className={`flex max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === "user" ? 'ml-3 bg-blue-600' : 'mr-3 bg-blue-800'} text-white`}>
                  {msg.role === "user" ? <FiUser /> : <RiRobot2Line />}
                </div>
                <div>
                  <div className={`p-3 rounded-lg ${msg.role === "user" ? (theme === 'dark' ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white') : (theme === 'dark' ? 'bg-blue-900 text-blue-100' : 'bg-gray-200 text-gray-800')} ${index === messages.length - 1 ? 'animate-fade-in' : ''}`}>
                    {msg.content}
                  </div>
                  <div className={`text-xs mt-1 ${msg.role === "user" ? 'text-right' : 'text-left'} ${theme === 'dark' ? 'text-blue-300' : 'text-gray-500'}`}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3 bg-blue-800 text-white">
                <RiRobot2Line />
              </div>
              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900' : 'bg-gray-200'} flex space-x-1`}>
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Box */}
        <div className={`p-4 ${theme === 'dark' ? 'bg-blue-900' : 'bg-white'} border-t ${theme === 'dark' ? 'border-blue-700' : 'border-gray-200'}`}>
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className={`flex-1 rounded-l-lg px-4 py-3 focus:outline-none ${theme === 'dark' ? 'bg-blue-800 text-white placeholder-blue-300' : 'bg-gray-100 text-gray-800 placeholder-gray-500'} transition`}
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              className={`px-4 py-4 rounded-r-lg ${(!input.trim() || isLoading) ? (theme === 'dark' ? 'bg-blue-700 text-blue-300' : 'bg-gray-300 text-gray-500') : (theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white')} transition-colors`}
              disabled={isLoading || !input.trim()}
            >
              <FiSend />
            </button>
          </form>
          <div className={`text-xs mt-2 text-center ${theme === 'dark' ? 'text-blue-300' : 'text-gray-500'}`}>
            AI Assistant may produce inaccurate information
          </div>
        </div>
      </div>
    </div>
  );
}