import { motion } from "framer-motion";

const NotesTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-semibold text-green-400 mb-6">Notes</h3>
      <p className="text-gray-300">Your notes will be displayed here.</p>
    </motion.div>
  );
};

export default NotesTab;
