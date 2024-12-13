import React, { useState } from 'react';
import axios from 'axios';
import logo from '../authlogo.png';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      const { token } = response.data;

      // Store token in localStorage (or cookies for secure storage)
      localStorage.setItem('token', token);

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to log in');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-3/4 max-w-4xl h-[80vh] bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Side - Sign Up Section */}
        <div className="w-1/2 bg-blue-600 flex flex-col justify-center items-center p-12">
          <h2 className="text-white text-3xl font-bold mb-4">Hello There!</h2>
          <p className="text-blue-200 mb-6 text-center">
            Join now by entering your organization and details
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50"
          >
            Sign Up
          </button>
        </div>

        {/* Right Side - Sign In Section */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src={logo} alt="Logo" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
          <form onSubmit={handleSignIn} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <p className="text-gray-500">Email</p>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-gray-500">Password</p>
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center pt-8 items-center">
              <button
                type="submit"
                className="flex justify-center items-center w-48 bg-yellow-400 text-white py-2 rounded-lg font-semibold hover:bg-yellow-500"
              >
                Go to Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
