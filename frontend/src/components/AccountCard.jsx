import { motion } from "framer-motion";

const AccountCard = ({ account, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 p-4 rounded-lg shadow-md"
    >
      <h3 className="text-xl font-semibold text-green-400 mb-2">
        {account.platform}
      </h3>
      <p className="text-gray-300 mb-1">Username: {account.username}</p>
      <p className="text-gray-400 mb-4">{account.description}</p>
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEdit}
          className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AccountCard;
