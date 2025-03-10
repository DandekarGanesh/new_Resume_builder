// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";

const Footer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };
  return (
    <div className=" bg-gray-50">

      <div className="pt-16 bg-gradient-to-b from-gray-50 to-white flex flex-col">

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <img
                  src="https://public.readdy.ai/ai/img_res/63d95a03d66afc535987467a22fa9f1e.jpg"
                  alt="Company Logo"
                  className="h-8 w-auto"
                />
                <p className="text-sm leading-relaxed">
                  Transforming businesses through innovative digital solutions.
                  We're committed to delivering excellence and driving
                  technological advancement.
                </p>
                <div className="flex space-x-4">
                  <button className="text-gray-300 hover:text-white transition-colors !rounded-button whitespace-nowrap">
                    <i className="fab fa-facebook-f text-lg"></i>
                  </button>
                  <button className="text-gray-300 hover:text-white transition-colors !rounded-button whitespace-nowrap">
                    <i className="fab fa-twitter text-lg"></i>
                  </button>
                  <button className="text-gray-300 hover:text-white transition-colors !rounded-button whitespace-nowrap">
                    <i className="fab fa-linkedin-in text-lg"></i>
                  </button>
                  <button className="text-gray-300 hover:text-white transition-colors !rounded-button whitespace-nowrap">
                    <i className="fab fa-instagram text-lg"></i>
                  </button>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {[
                    "About Us",
                    "Our Services",
                    "Case Studies",
                    "Blog",
                    "Careers",
                  ].map((item) => (
                    <li key={item}>
                      <button className="text-gray-300 hover:text-white text-sm transition-colors !rounded-button whitespace-nowrap">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="text-white font-semibold mb-4">Solutions</h3>
                <ul className="space-y-2">
                  {[
                    "Enterprise Solutions",
                    "Digital Transformation",
                    "Cloud Services",
                    "AI & Machine Learning",
                    "Cybersecurity",
                  ].map((item) => (
                    <li key={item}>
                      <button className="text-gray-300 hover:text-white text-sm transition-colors !rounded-button whitespace-nowrap">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-map-marker-alt mt-1"></i>
                    <span className="text-sm">
                      123 Innovation Drive, Tech Valley, CA 94043, United States
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="fas fa-phone"></i>
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="fas fa-envelope"></i>
                    <span className="text-sm">contact@company.com</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-sm">
                  © 2025 Company Name. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <button className="text-sm text-gray-300 hover:text-white transition-colors !rounded-button whitespace-nowrap">
                    Privacy Policy
                  </button>
                  <button className="text-sm text-gray-300 hover:text-white transition-colors !rounded-button whitespace-nowrap">
                    Terms of Service
                  </button>
                  <button className="text-sm text-gray-300 hover:text-white transition-colors !rounded-button whitespace-nowrap">
                    Cookie Policy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default Footer;
