import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardHeader from "../../containers/dashboard-header";
import MentalWellnessTracker from "../../containers/mental-wellness-tracker";
import Activities from "../../containers/activities";
import Calendar from "../../components/calendar";
import { Search, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatWidget from "../../components/chatbot-finetuned/chatbox";
import SideMenuMain from "../../containers/assessments-list";
import MoodSelector from "../../containers/mood-tracker";
import YouTubeVideo from "../../containers/youtubevid";

const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState<string>("Loading...");
  const [employees, setEmployees] = useState<{ name: string; avatar: string; mood: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userMood, setUserMood] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Token not found in localStorage.");
      setUserName("Guest");
      return;
    }

    const fetchUserName = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/fetch/fetch-user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.status} ${response.statusText}`);
        }

        const data: { name: string } = await response.json();
        setUserName(data.name || "Guest");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserName("Guest");
      }
    };

    fetchUserName();
  }, []);

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/assess/fetchfellows", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Error fetching employees: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (Array.isArray(data.employees)) {
        const formattedEmployees = data.employees.map((emp: { name: string; mood?: string }) => ({
          name: emp.name,
          avatar: "👤",
          mood: emp.mood || "😐",
        }));

        setEmployees(formattedEmployees);

        const currentUser = formattedEmployees.find((emp: {name: string}) => emp.name === userName);
        setUserMood(currentUser?.mood || "😐");
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userName !== "Loading...") {
      fetchEmployees();
    }
  }, [userName, userMood]);

  return (
    <motion.div
      className="flex flex-col md:flex-row bg-gray-100 h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <aside className="w-72 bg-white shadow-md">
        <SideMenuMain />
      </aside>

      <main className="flex-grow p-6">
        <div className="grid grid-cols-[2.2fr_0.8fr] gap-6">
          <div className="space-y-4">
            <DashboardHeader Name={userName} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MentalWellnessTracker />
              <MoodSelector prevMood={userMood ?? ''} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <YouTubeVideo />
              <Activities />
            </div>
          </div>

          <div className="bg-white shadow-md p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <h2 className="text-lg font-bold">{userName}</h2>
                  <p className="text-sm text-gray-500">View profile</p>
                </div>
              </div>
              <Settings className="text-gray-500 cursor-pointer" />
            </div>

            <div className="mt-4">
              <h3 className="text-md font-semibold mb-2">Fellow Employees</h3>
              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : employees.length > 0 ? (
                employees.map((emp, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-lg">
                        {emp.avatar}
                      </div>
                      <span className="text-sm font-medium">{emp.name}</span>
                    </div>
                    <span className="text-xl">{emp.mood}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No employees found.</p>
              )}
            </div>

            <ChatWidget />
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Dashboard;
