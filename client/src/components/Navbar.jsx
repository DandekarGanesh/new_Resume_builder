import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-600 p-4 flex justify-between items-center">
      <div className="text-white text-2xl font-bold">
        MyLogo
      </div>
      <div className={`lg:flex lg:space-x-8 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="space-y-4 lg:space-y-0 lg:flex lg:space-x-8">
          <li><a href="#home" className="text-white hover:text-yellow-500">Home</a></li>
          <li><a href="#about" className="text-white hover:text-yellow-500">About</a></li>
          <li><a href="#services" className="text-white hover:text-yellow-500">Services</a></li>
          <li><a href="#contact" className="text-white hover:text-yellow-500">Contact</a></li>
        </ul>
      </div>
      <button
        className="lg:hidden flex flex-col space-y-2"
        onClick={toggleMenu}
      >
        <span className="w-6 h-1 bg-white"></span>
        <span className="w-6 h-1 bg-white"></span>
        <span className="w-6 h-1 bg-white"></span>
      </button>
    </nav>
  );
};

export default Navbar;
