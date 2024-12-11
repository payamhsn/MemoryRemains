import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import TrustedPersonModal from "./TrustedPersonModal";
import InactivityPeriodSection from "./InactivityPeriodSection";

const SettingsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trustedPerson, fetchTrustedPerson, deleteTrustedPerson, isLoading } =
    useAuthStore();

  useEffect(() => {
    fetchTrustedPerson();
  }, [fetchTrustedPerson]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    deleteTrustedPerson();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-semibold text-green-400 mb-6">Settings</h3>

      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold text-green-400">
            Trusted Person
          </h4>
          {!trustedPerson && (
            <button
              onClick={handleOpenModal}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full flex items-center transition duration-300"
            >
              <Pencil size={16} className="mr-1" />
              Add
            </button>
          )}
        </div>
        <p className="text-gray-300 mb-4">Set your trusted person info here.</p>
        {trustedPerson ? (
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300">
              <strong>Name:</strong> {trustedPerson.fullName}
            </p>
            <p className="text-gray-300">
              <strong>Email:</strong> {trustedPerson.email}
            </p>
            <p className="text-gray-300">
              <strong>Phone:</strong> {trustedPerson.phoneNumber}
            </p>
            <p className="text-gray-300">
              <strong>Message:</strong>{" "}
              {trustedPerson.predefinedMessage || "Default message"}
            </p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleOpenModal}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full flex items-center transition duration-300"
              >
                <Pencil size={16} className="mr-1" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full flex items-center transition duration-300"
              >
                <Trash2 size={16} className="mr-1" />
                Delete
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 italic">No trusted person set</p>
        )}
      </div>

      <InactivityPeriodSection />

      <TrustedPersonModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        trustedPerson={trustedPerson}
      />
    </motion.div>
  );
};

export default SettingsTab;
