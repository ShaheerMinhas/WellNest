import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, CheckSquare, Heart, Activity } from 'lucide-react';

const DashboardCards: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [positiveMoods, setPositiveMoods] = useState<number | null>(null);
  const [negativeMoods, setNegativeMoods] = useState<number | null>(null);
  const [assessmentResultsCount, setAssessmentResultsCount] = useState<number | null>(null);
  const [averageHealth, setAverageHealth] = useState<number | null>(null);

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
    
    const fetchAssessmentResultsCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/assess/assessment-results/count');
        setAssessmentResultsCount(response.data.count);
      } catch (err) {
        setError('Failed to fetch assessment results count');
      }
    };
    
    const fetchPositiveMoodsCount = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/assess/positive");
        if (!response.ok) throw new Error("Failed to fetch positive moods");

        const data = await response.json();
        setPositiveMoods(data.positiveCount);
      } catch (error) {
        setError("Error fetching positive moods");
        setPositiveMoods(0);
      }
    };

    const fetchNegativeMoodsCount = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/assess/negative");
        if (!response.ok) throw new Error("Failed to fetch negative moods");

        const data = await response.json();
        setNegativeMoods(data.negativeCount);
      } catch (error) {
        setError("Error fetching negative moods");
        setNegativeMoods(0);
      }
    };

    const fetchAverageHealthMetric = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/assess/totalhealth");
        setAverageHealth(response.data.averageHealth);
      } catch (error) {
        setError("Error fetching average health metric");
        setAverageHealth(0);
      }
    };

    fetchTotalUsers();
    fetchAssessmentResultsCount();
    fetchPositiveMoodsCount();
    fetchNegativeMoodsCount();
    fetchAverageHealthMetric();
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* Card 1: Employees */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Employees</h3>
          <Users className="w-6 h-6 text-gray-500" />
        </div>
        <div className="mt-4">
          {error ? <p className="text-red-500">{error}</p> : <p className="text-3xl font-bold">{totalUsers}</p>}
        </div>
      </div>

      {/* Card 2: Assessments Completed */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Assessments Completed</h3>
          <CheckSquare className="w-6 h-6 text-gray-500" />
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold">{assessmentResultsCount !== null ? assessmentResultsCount : 'Loading...'}</p>
        </div>
      </div>

      {/* Card 3: Positive Diagnoses */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Positive Diagnoses</h3>
          <Heart className="w-6 h-6 text-gray-500" />
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold">{positiveMoods}</p>
        </div>
      </div>

      {/* Card 4: Negative Diagnoses */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Negative Diagnoses</h3>
          <Heart className="w-6 h-6 text-gray-500" />
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold">{negativeMoods}</p>
        </div>
      </div>

      {/* Card 5: Average Health Metric */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Average Health Metric</h3>
          <Activity className="w-6 h-6 text-gray-500" />
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold">{averageHealth   }</p>
          <p className="text-sm text-green-600 mt-1">↑ Value out of 100</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
