import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardHeader from "../../containers/dashboard-header";
import AssessmentsList from "../../containers/assessments-list";
import MentalWellnessTracker from "../../containers/mental-wellness-tracker";
import Activities from "../../containers/activities";
import Calendar from "../../components/shared/calendar";

const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem("token"); // Fetch token from local storage
        if (token) {
          const response = await fetch("http://localhost:3000/api/fetch/fetch-user", {
            headers: { Authorization: `Bearer ${token}` }, // Attach token in headers
          });

          if (!response.ok) {
            throw new Error(`Error fetching user: ${response.statusText}`);
          }

          const data = await response.json();
          setUserName(data.name); // Assuming the API response contains { name: "John Doe" }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <motion.div
      className="flex flex-col md:flex-row bg-gray-100 h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Sidebar for Assessments */}
      <aside className="w-full md:w-1/4 p-4 bg-white shadow-lg">
        <AssessmentsList />
      </aside>

      {/* Main Content */}
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
