import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardHeader from "../../containers/dashboard-header";
import MentalWellnessTracker from "../../containers/mental-wellness-tracker";
import Activities from "../../containers/activities";
import Calendar from "../../components/calendar";
import AssessmentsList from "../../containers/assessments-list";

const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState<string>("Loading...");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem("token"); // Fetch token from local storage
        if (token) {
          const response = await fetch("http://localhost:3000/api/fetch/fetch-user", {
            headers: { Authorization: `Bearer ${token}` }, // Attach token in headers
          });

          if (!response.ok) {
            throw new Error(`Error fetching user: ${response.status} ${response.statusText}`);
          }

          const data: { name: string } = await response.json();
          if (data.name) {
            setUserName(data.name); // Assuming the API response contains { name: "John Doe" }
          } else {
            throw new Error("Name property is missing in the response.");
          }
        } else {
          console.warn("Token not found in localStorage.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserName("Guest"); // Fallback username
      }
    };

    fetchUserName();
  }, []); // Empty dependency array ensures it runs only once on mount.

  return (
    <motion.div
      className="flex flex-col md:flex-row bg-gray-100 h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Sidebar for Assessments 
      {/* Main Content */}
       <aside className="w-72 bg-white shadow-md">
        <AssessmentsList />
      </aside>
      <main className="flex-grow p-6 space-y-6">
        <DashboardHeader Name={userName} /> {/* Pass dynamic username */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MentalWellnessTracker />
          <Activities />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Calendar />
        </div>
      
      </main>
    </motion.div>
  );
};

export default Dashboard;
