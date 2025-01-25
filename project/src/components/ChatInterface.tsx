import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { sendMessage } from '../utils/geminiApi';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; error?: boolean }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Kullanıcı mesajını ekle
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage);
      setMessages(prev => [...prev, {
        text: response,
        isUser: false
      }]);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Bir hata oluştu. Lütfen tekrar deneyin.';

      setMessages(prev => [...prev, {
        text: errorMessage,
        isUser: false,
        error: true
      }]);
      
      console.error('Chat Hatası:', {
        error,
        message: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[600px] flex flex-col">
      <div className="bg-[#1F2937] text-white p-4">
        <h2 className="text-lg font-semibold">Akıllı Asistan</h2>
        <p className="text-sm text-gray-300">Hukuki sorularınızı yanıtlıyorum</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-[#D98E63] text-white'
                  : message.error
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg animate-pulse">
              Yanıt yazılıyor...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Hukuki sorunuzu yazın..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-[#D98E63]"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-[#D98E63] text-white p-2 rounded-lg hover:bg-[#C47E53] transition disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;