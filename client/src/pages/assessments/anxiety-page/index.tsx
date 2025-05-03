import { motion } from "framer-motion";
import Chat from "../../../containers/chatroom";
import { bai_questions } from "../../../demo-data";
import AssessmentsList from "../../../containers/assessments-list";

const Anxiety: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar for Assessments */}
      <aside className="w-72 bg-white shadow-md">
        <AssessmentsList />
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 space-y-6 overflow-y-auto">
        <motion.div
          className="flex flex-col bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-grow">
            <Chat questions={bai_questions} testtype="1" />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Anxiety;
