import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const InactivityPeriodSection = () => {
  const [inactivityPeriod, setInactivityPeriod] = useState("");
  const { fetchInactivityPeriod, updateInactivityPeriod, isLoading } =
    useAuthStore();

  useEffect(() => {
    const loadInactivityPeriod = async () => {
      const period = await fetchInactivityPeriod();
      setInactivityPeriod(period || "");
    };
    loadInactivityPeriod();
  }, [fetchInactivityPeriod]);

  const handleSave = async () => {
    await updateInactivityPeriod(inactivityPeriod);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 p-6 rounded-lg mb-6"
    >
      <h4 className="text-xl font-semibold text-green-400 mb-4">
        Inactivity Period
      </h4>
      <p className="text-gray-300 mb-4">
        Set your inactivity period here. If you have been inactive for this
        period of time, we will notify your trusted person.
      </p>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          value={inactivityPeriod}
          onChange={(e) => setInactivityPeriod(e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg w-24"
          placeholder="Months"
        />
        <span className="text-gray-300">Months</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default InactivityPeriodSection;
