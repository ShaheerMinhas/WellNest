import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, CheckSquare, Heart, Activity } from 'lucide-react';

const DashboardCards: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTotalUsers = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        setError('No token found in localStorage.');
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token to get payload
        const companyId = decodedToken.companyId; // Get companyId from the token payload

        if (!companyId) {
          setError('No company ID found in token.');
          return;
        }

        const response = await axios.post(
          'http://localhost:3000/api/admin/users/totalUsers',
          { companyId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setTotalUsers(response.data.totalUsers);
      } catch (err) {
        setError('Failed to fetch total users');
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* Card 1 */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Employees</h3>
          <Users className="w-6 h-6 text-gray-500" />
        </div>
        <div className="mt-4">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <p className="text-3xl font-bold">{totalUsers}</p>
              <p className="text-sm text-green-600 mt-1">↑ 0% Since last month</p>
            </>
          )}
        </div>
      </div>

      {/* Other cards */}
      {/* Card 2 */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Assessments Completed</h3>
          <CheckSquare className="w-6 h-6 text-gray-500" />
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold">2154</p>
          <p className="text-sm text-red-600 mt-1">↓ 1.8% Since last month</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Positive Diagnoses</h3>
          <Heart className="w-6 h-6 text-gray-500" />
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold">678</p>
          <p className="text-sm text-green-600 mt-1">↑ 5.2% Since last month</p>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Activities Participation</h3>
          <Activity className="w-6 h-6 text-gray-500" />
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold">+48.2%</p>
          <p className="text-sm text-green-600 mt-1">↑ 3.87% Since last month</p>
        </div>
      </div>

      {/* Card 5 */}
      <div className="bg-white rounded-lg shadow-md p-4 col-span-2 lg:col-span-1">
        <h3 className="text-lg font-semibold">Sessions By Channel</h3>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-green-600">IT</span>
            <span className="text-gray-600">20 assessments</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-green-600">Marketing</span>
            <span className="text-gray-600">19 assessments</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-green-600">DevOps</span>
            <span className="text-gray-600">25 assessments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
