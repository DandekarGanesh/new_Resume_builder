import React, { useState } from 'react';
import axiosInstance from '../../Helpers/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Make POST request to login the user
      const response = await axiosInstance.post('user/login', formData);

      if (response.status === 200) {
        // On successful login
        toast.success('Login successful!');
        setTimeout(() => {
          navigate('/home'); // Redirect to /home after success
        }, 2000); // Delay to show the success message
      }
    } catch (error) {
      // Handle error response from the server
      if (error.response) {
        // Server error
        toast.error(error?.response?.data?.message || 'Something went wrong!');
      } else {
        // Network or other error
        toast.error('Network error. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    // Here you can navigate to a Forgot Password page or show a modal
    // If you want to redirect to a Forgot Password page, you can do something like:
    navigate('/forgotpassword');
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen flex justify-center items-center py-16 px-6">
      <div className="bg-white w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ease-in-out hover:shadow-lg ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ease-in-out hover:shadow-lg ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <div className="mb-6 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 text-lg font-semibold rounded-lg text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} transition duration-300`}
            >
              {isSubmitting ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-purple-600 hover:underline text-sm cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Don't have an account? <a href="/signup" className="text-purple-600 hover:underline">Sign up here</a></p>
        </div>
      </div>

      {/* Toast container for showing notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
