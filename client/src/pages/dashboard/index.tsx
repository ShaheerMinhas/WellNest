import { motion } from "framer-motion";
import DashboardHeader from "../../containers/dashboard-header";
import AssessmentsList from "../../containers/assessments-list";
import MentalWellnessTracker from "../../containers/mental-wellness-tracker";
import Activities from "../../containers/activities";
//import EmotionalSupport from "../../containers/emotional-support";
import Calendar from "../../components/shared/calendar";

const Dashboard: React.FC = () => {
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