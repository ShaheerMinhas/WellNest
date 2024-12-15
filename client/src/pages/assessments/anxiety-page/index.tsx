import { motion } from "framer-motion";
import Chat from "../../../containers/chatroom";
import { bai_questions } from "../../../demo-data";

const Anxiety: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row bg-gray-50 h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex-grow">
        <Chat questions={bai_questions} />
      </main>
    </motion.div>
  );
};

export default Anxiety;
