import { motion } from "framer-motion";
import DashboardHeader from "../../containers/dashboard-header";
import MentalWellnessTracker from "../../containers/mental-wellness-tracker";
import Activities from "../../containers/activities";
import Calendar from "../../components/calendar";

const Dashboard: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row bg-gray-50 h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex-grow py-6 space-y-6">
        <DashboardHeader />
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
