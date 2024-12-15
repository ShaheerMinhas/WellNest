import { useState, useEffect } from 'react';
import { assessmentsData } from "../information-text"; // Import data
import AssessmentCard from "../components/assessment-card";
import { Brain } from 'lucide-react';
import { House } from 'lucide-react';
import { HandHeart } from 'lucide-react';
import { Link } from "react-router-dom"; // Import Link for navigation

const AssessmentsList: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

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
        className={`${isSidebarVisible ? 'translate-x-0 z-10' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:translate-x-0 w-72 bg-white shadow-md fixed h-full overflow-y-auto`}
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
            <span className="text-lg font-semibold">Assesments</span>
        </div>

        {/* Assessment List */}
        <div className="grid gap-3 mx-2 my-2">
          {assessmentsData.map((assessment, index) => (
            <AssessmentCard
              key={index}
              title={assessment.title}
              description={assessment.description}
              rt={assessment.rt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentsList;
