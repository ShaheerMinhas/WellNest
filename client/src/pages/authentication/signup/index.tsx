import React, { useEffect, useState } from 'react';
import logo from '../authlogo.png';

const SignUp: React.FC = () => {
  const [organizations, setOrganizations] = useState<{ id: number; name: string }[]>([]);

  // Fetch organizations from the backend API
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get-organizations');
        const data = await response.json();
        setOrganizations(data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-3/4 max-w-4xl h-[80vh] bg-white shadow-lg rounded-lg overflow-hidden flex">
        
        {/* Left Side - Sign Up Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            {/* Placeholder for Logo */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img src={logo} alt="Logo" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
          <form className="space-y-4">

            {/* Input for Email */}
            <p className="text-gray-500">Email</p>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Input for Password */}
            <p className="text-gray-500">Password</p>
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Dropdown for Selecting Organization */}
            <p className="text-gray-500">Select Organization</p>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select your organization --</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
            <div className="flex justify-center pt-8 items-center">
              <button className="flex justify-center items-center w-48 bg-yellow-400 text-white py-2 rounded-lg font-semibold hover:bg-yellow-500">
                Create Account
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Welcome Section */}
        <div className="w-1/2 bg-blue-600 flex flex-col justify-center items-center p-12">
          <h2 className="text-white text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-blue-200 mb-6 text-center">
            Already have an account? Sign in to manage your dashboard.
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
