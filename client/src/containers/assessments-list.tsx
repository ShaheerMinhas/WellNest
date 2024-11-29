import { useState, useEffect } from 'react';
import { assessmentsData } from "../information-text"; // Import data
import AssessmentCard from "../components/assessment-card";
import { Brain } from 'lucide-react';
import { House } from 'lucide-react';
import { HandHeart } from 'lucide-react';
import { Cog } from 'lucide-react'; // Import Gear icon
import { Link } from "react-router-dom"; // Import Link for navigation

const AssessmentsList: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [completedAssessments, setCompletedAssessments] = useState<Set<number>>(new Set()); // State to track completed assessments

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchAssessmentCompletion = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found in localStorage.");
        return;
      }

      try {
        // Create a Set to track completed assessments
        const completedTestTypes = new Set<number>();

        // Loop over each testtype (1 and 2) and fetch completion status
        for (let testtype = 1; testtype <= 2; testtype++) {
          const response = await fetch("http://localhost:3000/api/assess/checktestcompletion", {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ testtype }), // Send current testtype in the request body
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch data for testtype ${testtype}: ${response.status}`);
          }

          const data = await response.json();
          console.log(`Assessment completion data for testtype ${testtype}:`, data);

          // If the test is completed, add the testtype to the Set
          if (data.completed) {
            completedTestTypes.add(testtype); // Add testtype to Set
          }
        }

        // Update state with completed test types
        setCompletedAssessments(completedTestTypes);
      } catch (error) {
        console.error("Error fetching assessment completion:", error);
      }
    };

    fetchAssessmentCompletion();
  }, []);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <div>
      {/* Toggle button for mobile view */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-20 md:hidden bg-white p-2 rounded-md shadow-md"
      >
        <Brain className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`${isSidebarVisible ? 'translate-x-0 z-10' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out md:translate-x-0 w-72 bg-white shadow-md fixed h-full overflow-y-auto`}
      >
        {/* Welcome Message */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-bruno font-black text-gray-800">WellNest</h2>
        </div>

        {/* Home Button */}
        <div className="p-4 border-b border-gray-200">
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 text-gray-800"
          >
            <House className="w-6 h-6" />
            <span className="text-lg font-semibold">Home</span>
          </Link>
        </div>

        {/* Assessments Header */}
        <div className="p-4 border-gray-200 flex items-center space-x-3 text-gray-800">
          <HandHeart className="w-6 h-6" />
          <span className="text-lg font-semibold">Assessments</span>
        </div>

        {/* Assessment List */}
        <div className="grid gap-3 mx-2 my-2">
          {assessmentsData.map((assessment, index) => (
            <AssessmentCard
              key={index}
              title={assessment.title}
              description={assessment.description}
              rt={assessment.rt}
              isCompleted={completedAssessments.has(index + 1)} // Pass the completion status for each assessment
            />
          ))}
        </div>

        {/* Settings Button */}
        <div className="p-4 border-t border-gray-200">
          <Link
            to="/settings"
            className="flex items-center space-x-3 text-gray-800 hover:text-gray-600"
          >
            <Cog className="w-6 h-6" />
            <span className="text-lg font-semibold">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsList;
