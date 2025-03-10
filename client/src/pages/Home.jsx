import React, { useState } from 'react';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-100  flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-semibold text-gray-800">Resume Builder</div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-gray-900 p-2 !rounded-button cursor-pointer md:hidden"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Side menu (only visible on mobile) */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-10 md:hidden">
          <div className="bg-white p-6 w-3/4 h-full flex flex-col space-y-4">
            <a href="#" className="text-gray-800 text-lg">Home</a>
            <a href="#about" className="text-gray-800 text-lg">About</a>
            <a href="#features" className="text-gray-800 text-lg">Features</a>
            <a href="#contact" className="text-gray-800 text-lg">Contact</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-24 bg-gray-200 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Create Your Professional Resume</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Build an impressive and tailored resume with ease using our intuitive Resume Builder. Start creating your future today!
        </p>
        <button className="cursor-pointer px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Features</h2>
          <p className="text-lg text-gray-600 mt-4 mb-10">
            Discover the powerful features that make our Resume Builder unique and easy to use.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Customizable Templates</h3>
              <p className="text-gray-600 mt-2">
                Choose from a variety of modern, customizable resume templates that suit your professional needs.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Easy to Use</h3>
              <p className="text-gray-600 mt-2">
                Our intuitive drag-and-drop builder makes creating your resume a breeze, even without design skills.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Export Options</h3>
              <p className="text-gray-600 mt-2">
                Download your resume in various formats, including PDF and Word, to suit all your application needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
