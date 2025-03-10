import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-semibold text-gray-800">Resume Builder</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gray-200 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
          We are passionate about helping individuals create a standout resume effortlessly. Our Resume Builder provides intuitive tools, customizable templates, and expert guidance to help you showcase your skills and experience in the best possible way.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Our mission is to empower job seekers with a user-friendly, customizable platform that allows them to create professional and tailored resumes. We believe that everyone deserves a chance to shine, and we’re here to make the resume-building process as easy as possible.
          </p>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Our Vision</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            We envision a world where everyone can create a resume that represents their unique strengths and professional journey. Our goal is to make the resume creation process simple, accessible, and effective for individuals from all walks of life.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Why Choose Us?</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Customizable Templates</h3>
              <p className="text-gray-600 mt-2">
                Choose from a wide range of customizable templates that suit your industry and personal style.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">User-Friendly Interface</h3>
              <p className="text-gray-600 mt-2">
                Our drag-and-drop builder is easy to use, even if you have no design experience. Build your resume in just a few clicks.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Professional Guidance</h3>
              <p className="text-gray-600 mt-2">
                Our resume-building tools come with tips and guidelines from career experts to help you present your best self.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
