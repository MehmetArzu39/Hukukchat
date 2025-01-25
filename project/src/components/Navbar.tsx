import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold text-gray-800">HukukChat</div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-800">Chat</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Abonelik</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Kurumsal</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">İletişim</a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              Giriş Yap
            </button>
            <button className="bg-[#D98E63] text-white px-4 py-2 rounded-lg hover:bg-[#C47E53] transition">
              Ücretsiz Dene
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;