import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import AssessmentsList from "../../containers/assessments-list"; // Sidebar

const Layout: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row bg-gray-50 h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Sidebar for Assessments */}
      <aside className="w-72 bg-white shadow-md">
        <AssessmentsList />
      </aside>

      {/* Main content */}
      <main className="flex-grow px-6 space-y-6">
        <Outlet />  {/* This renders Dashboard or Depression based on routing */}
      </main>
    </motion.div>
  );
};

export default Layout;
