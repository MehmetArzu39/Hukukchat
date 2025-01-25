import React, { useState } from 'react';
import { Scale, MessageSquare, FileText, FileSignature, Clock, Lock, Zap } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import Navbar from './components/Navbar';

function App() {
  const [selectedTab, setSelectedTab] = useState('chat');

  const features = [
    { name: 'Emsal Karar Arama', icon: <Scale className="w-6 h-6" /> },
    { name: 'Mevzuat Arama', icon: <FileText className="w-6 h-6" /> },
    { name: 'Sözleşme Hazırlama', icon: <FileSignature className="w-6 h-6" /> },
    { name: 'Dilekçe Hazırlama', icon: <MessageSquare className="w-6 h-6" /> },
  ];

  const benefits = [
    { icon: <Clock className="w-5 h-5" />, text: '14 Gün Ücretsiz' },
    { icon: <Lock className="w-5 h-5" />, text: 'Kurulum Gerektirmez' },
    { icon: <Zap className="w-5 h-5" />, text: '7/24 Hizmetinizde' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm mb-6">
                #1 Hukuk Teknolojisi Platformu
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Yapay Zeka ile<br />
                Hukuki Çözümler<br />
                Tek Platformda
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                Tek bir platformda zengin içtihat veritabanına (4.5 milyon+),
                anlık güncellenen mevzuata, ve Mehmet Arzu tabanlı yapay
                zeka asistanına erişin.
              </p>
              <div className="flex gap-4">
                <button className="bg-[#D98E63] text-white px-6 py-3 rounded-lg hover:bg-[#C47E53] transition">
                  Ücretsiz Dene
                </button>
                <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
                  Demoyu İzle
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="text-[#D98E63] mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-800">{feature.name}</h3>
                </div>
              ))}
            </div>

            <div className="flex gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  {benefit.icon}
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Chat Interface */}
          <div className="lg:w-1/2">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;