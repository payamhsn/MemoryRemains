import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { User, Mail, Phone, MessageSquare } from "lucide-react";

const TrustedPersonModal = ({ isOpen, onClose, trustedPerson }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [predefinedMessage, setPredefinedMessage] = useState("");

  const { saveTrustedPerson, updateTrustedPerson, isLoading } = useAuthStore();
  const modalRef = useRef();

  useEffect(() => {
    if (trustedPerson) {
      setFullName(trustedPerson.fullName);
      setEmail(trustedPerson.email);
      setPhoneNumber(trustedPerson.phoneNumber);
      setPredefinedMessage(trustedPerson.predefinedMessage || "");
    }
  }, [trustedPerson]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { fullName, email, phoneNumber, predefinedMessage };
    if (trustedPerson) {
      await updateTrustedPerson(data);
    } else {
      await saveTrustedPerson(data);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 p-8 rounded-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-green-400">
              {trustedPerson ? "Edit" : "Add"} Trusted Person
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="relative">
                <MessageSquare
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Predefined Message"
                  value={predefinedMessage}
                  onChange={(e) => setPredefinedMessage(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <p className="text-sm text-gray-400 mt-2 mb-4">
                If you don't write a predefined message, we'll write it for you.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrustedPersonModal;
