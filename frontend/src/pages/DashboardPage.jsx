import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import ProfileTab from "../components/ProfileTab";
import AccountsTab from "../components/AccountsTab";
import NotesTab from "../components/NotesTab";
import SettingsTab from "../components/SettingsTab";

const DashboardPage = () => {
  const { logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    logout();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "accounts":
        return <AccountsTab />;
      case "notes":
        return <NotesTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
        Dashboard
      </h2>

      <div className="flex">
        <div className="w-1/4 pr-6 border-r border-gray-700">
          <nav className="space-y-2">
            {["profile", "accounts", "notes", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left py-2 px-4 rounded transition-colors ${
                  activeTab === tab
                    ? "bg-green-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
            font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Logout
          </motion.button>
        </div>
        <div className="w-3/4 pl-6">{renderTabContent()}</div>
      </div>
    </motion.div>
  );
};
export default DashboardPage;
