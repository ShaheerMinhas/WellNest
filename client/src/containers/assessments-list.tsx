import { useState, useEffect } from 'react';
import { assessmentsData } from "../information-text"; // Import data
import AssessmentCard from "../components/assessment-card";
import { Brain, House, HandHeart, Cog, ChevronDown, ChevronUp ,MessageSquare,Calendar,UserCheck, DoorOpen} from 'lucide-react'; // Import icons
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation

const AssessmentsList: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isAssessmentsOpen, setIsAssessmentsOpen] = useState(true); // Toggle state for Self Assessments
  const [completedAssessments, setCompletedAssessments] = useState<Set<number>>(new Set());
  const [bothCompleted , setBothCompleted]=useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/signin"); // Redirect to login page
  };
  useEffect(() => {
    const handleResize = () => setIsSidebarVisible(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchAssessmentCompletion = async () => {
      const token = localStorage.getItem("token");
      if (!token) return console.log("No token found.");
  
      try {
        const completedTestTypes = new Set<number>();
  
        for (let testtype = 1; testtype <= 2; testtype++) {
          const response = await fetch("http://localhost:3000/api/assess/checktestcompletion", {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ testtype }),
          });
  
          if (!response.ok) throw new Error(`Failed to fetch testtype ${testtype}: ${response.status}`);
          
          const data = await response.json();
          if (data.completed) completedTestTypes.add(testtype);
        }
  
        setCompletedAssessments(completedTestTypes);
  
        // Check if both assessments are completed
        const bothDone = completedTestTypes.has(1) && completedTestTypes.has(2);
        console.log("WOWWWW",bothDone)
        setBothCompleted(bothDone);
        localStorage.setItem("bothCompleted", JSON.stringify(bothDone)); // Store in localStorage
      } catch (error) {
        console.error("Error fetching completion status:", error);
      }
    };
  
    fetchAssessmentCompletion();
  }, [loading]); // Runs when loading changes
  

  const resetAssessments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        alert('User not authenticated');
        return;
      }

      const response = await fetch('http://localhost:3000/api/assess/resettests', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert('Success: ' + data.message);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error: Failed to reset assessments.');
    }
    setLoading(false);
  };
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
  const toggleAssessments = () => setIsAssessmentsOpen(!isAssessmentsOpen);

  return (
    <div>
    {/* Mobile Sidebar Toggle Button */}
    <button
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-20 md:hidden bg-white p-2 rounded-md shadow-md"
    >
      <Brain className="w-6 h-6" />
    </button>
  
    {/* Sidebar */}
    <div
      className={`${
        isSidebarVisible ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:translate-x-0 w-72 bg-white shadow-md fixed h-full overflow-y-auto`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-bruno font-black text-gray-800">WellNest</h2>
      </div>
  
      {/* Home */}
      <div className="p-4 border-b border-gray-200">
        <Link to="/dashboard" className="flex items-center space-x-3 text-gray-800">
          <House className="w-6 h-6" />
          <span className="text-lg font-semibold">Home</span>
        </Link>
      </div>
  
      {/* Self Assessments Toggle Button */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-3 text-gray-800">
          <HandHeart className="w-6 h-6" />
          <span className="text-lg font-semibold">Self Assessments</span>
        </div>
        <button onClick={toggleAssessments} className="p-1 rounded-md">
          {isAssessmentsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>
  
      {/* Assessments List (Toggled) */}
      {isAssessmentsOpen && (
        <>
          <div className="grid gap-3 mt-3 mx-2">
            {assessmentsData.map((assessment, index) => (
              <AssessmentCard
                key={index}
                title={assessment.title}
                description={assessment.description}
                rt={assessment.rt}
                isCompleted={completedAssessments.has(index + 1)}
              />
            ))}
          </div>
          <button onClick={resetAssessments} disabled={loading}>
            {loading ? (
              <div className="p-4 border-b border-gray-200">
                <span className="text-lg text-red-700 font-semibold">Resetting</span>
              </div>
            ) : (
              <div className="p-4 border-b border-gray-200">
                <span className="text-lg text-red-700 font-semibold">Reset</span>
              </div>
            )}
          </button>
        </>
      )}
  
      {/* Feedback */}
      <div className="p-4 border-b border-gray-200">
        <Link to="/feedback" className="flex items-center space-x-3 text-gray-800 hover:text-gray-600">
          <MessageSquare className="w-6 h-6" />
          <span className="text-lg font-semibold">Feedback</span>
        </Link>
      </div>
  
      {/* Events */}
      <div className="p-4 border-b border-gray-200">
        <Link to="/events" className="flex items-center space-x-3 text-gray-800 hover:text-gray-600">
          <Calendar className="w-6 h-6" />
          <span className="text-lg font-semibold">Events</span>
        </Link>
      </div>
  
      {/* Book a Therapist */}
      <div className="p-4 border-b border-gray-200">
        <Link to="/book-therapist" className="flex items-center space-x-3 text-gray-800 hover:text-gray-600">
          <UserCheck className="w-6 h-6" />
          <span className="text-lg font-semibold">Book a Therapist</span>
        </Link>
      </div>
  
      {/* Settings */}
      <div className="p-4 border-t border-gray-200">
        <Link to="/settings" className="flex items-center space-x-3 text-gray-800 hover:text-gray-600">
          <Cog className="w-6 h-6" />
          <span className="text-lg font-semibold">Settings</span>
        </Link>
      </div>
      <div className="p-4 border-t border-gray-200 flex items-center space-x-3">
        <DoorOpen className='="w-6 h-6'/>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-gray-800 hover:text-red-600"
        >
          <span className="text-lg font-semibold">Logout</span>
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default AssessmentsList;
