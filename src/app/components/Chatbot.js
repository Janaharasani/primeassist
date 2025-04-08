"use client";
import { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to Prime Assist! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.response?.content) {
        setMessages((prev) => [...prev, { 
          role: 'assistant', 
          content: data.response.content 
        }]);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: error.message || 'Sorry, something went wrong!' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[#000F2B]' >
   <div className="bg-[#000F2B] text-white h-full flex flex-col min-h-screen">
      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col">
        <div className="text-center py-6">
          <RiRobot2Line className="text-5xl mx-auto text-purple-400" />
          <h1 className="text-2xl font-semibold">Prime Assist Chatbot</h1>
          <p className="text-purple-200">Get instant support for your stadium experience</p>
        </div>

        <div className="flex-1 overflow-auto px-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-start gap-3 my-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex-shrink-0">
                <div className="rounded-full p-2 bg-purple-600">
                  {msg.role === 'user' ? <FiUser /> : <RiRobot2Line />}
                </div>
              </div>
              <div className={`max-w-[70%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-purple-700' : 'bg-purple-900'}`}>
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className="text-lg whitespace-pre-wrap">{line}</p>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center justify-start my-4 gap-2 animate-pulse">
              <div className="rounded-full p-2 bg-purple-600">
                <RiRobot2Line />
              </div>
              <div className="max-w-[70%] p-3 bg-purple-900 rounded-lg">
                <p>Typing...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex gap-2 border-t border-purple-700">
          <input
            type="text"
            className="flex-1 bg-[#03143e] border border-purple-500 rounded-lg px-4 py-2 placeholder-purple-300 focus:outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={loading || !input.trim()} className="bg-purple-600 px-4 rounded-lg hover:bg-purple-700">
            <FiSend />
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}




