import React, { useEffect, useState } from 'react';
import logo from '../authlogo.png';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [organizations, setOrganizations] = useState<{ id: number; name: string }[]>([]);
  const [formData, setFormData] = useState({
    name: '', // Added Name field
    email: '',
    password: '',
    organization: '',
  });
  const navigate = useNavigate();

  // Fetch organizations from the backend API
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/organization/get-organizations');
        const data = await response.json();
        setOrganizations(data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === 'organization' ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    console.log(formData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/signin');
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-3/4 max-w-4xl h-[80vh] bg-white shadow-lg rounded-lg overflow-hidden flex">

        {/* Left Side - Sign Up Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src={logo} alt="Logo" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Input for Name */}
            <p className="text-gray-500">Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your Name"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Input for Email */}
            <p className="text-gray-500">Email</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your Email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Input for Password */}
            <p className="text-gray-500">Password</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Dropdown for Selecting Organization */}
            <p className="text-gray-500">Select Organization</p>
            <select
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="" disabled>-- Select Organization --</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>

            <div className="flex justify-center pt-8 items-center">
              <button
                type="submit"
                className="flex justify-center items-center w-48 bg-yellow-400 text-white py-2 rounded-lg font-semibold hover:bg-yellow-500"
              >
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
          <button
            onClick={() => navigate('/signin')}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
