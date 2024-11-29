import React, { useEffect, useState } from 'react';

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Formats the date to 'MM/DD/YYYY' (or based on locale)
};

const Activities: React.FC = () => {
  const [assessments, setAssessments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const token = localStorage.getItem("token"); // Fetch token from local storage
        if (token) {
          const response = await fetch("http://localhost:3000/api/assess/activities", {
            headers: { Authorization: `Bearer ${token}` }, // Attach token in headers
          });

          if (!response.ok) {
            throw new Error(`Error fetching activities: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          if (data.assessments) {
            setAssessments(data.assessments); // Assuming the API returns { assessments: [...] }
          } else {
            throw new Error("Assessments property is missing in the response.");
          }
        } else {
          console.warn("Token not found in localStorage.");
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchAssessments();
  }, []); // Empty dependency array

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Activities</h2>
      
      {/* Display activities */}
      <ul className="space-y-4">
        {assessments.map((assessment) => (
          <li key={assessment.id} className="flex justify-between items-center border-b pb-4">
            <div>
              <p className="font-semibold">{assessment.title}</p>
              <p className="text-sm text-red-500">Due: {formatDate(assessment.due_date)}</p>
            </div>
            <button className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
              Start Assessment
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;
