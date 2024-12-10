import { useAuthStore } from "../store/authStore";
import AccountModal from "./AccountModal";
import { motion, AnimatePresence } from "framer-motion";
import AccountCard from "./AccountCard";
import { useState, useEffect } from "react";

const AccountsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const {
    accounts,
    fetchAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    isLoading,
    error,
  } = useAuthStore();

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleOpenModal = (account = null) => {
    setEditingAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingAccount(null);
    setIsModalOpen(false);
  };

  const handleSaveAccount = async (accountData) => {
    if (editingAccount) {
      await updateAccount(editingAccount._id, accountData);
    } else {
      await createAccount(accountData);
    }
    handleCloseModal();
  };

  const handleDeleteAccount = async (accountId) => {
    await deleteAccount(accountId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-semibold text-green-400 mb-6">Accounts</h3>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleOpenModal()}
        className="mb-6 py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
      >
        Add New Account
      </motion.button>
      <AnimatePresence>
        {isModalOpen && (
          <AccountModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveAccount}
            account={editingAccount}
          />
        )}
      </AnimatePresence>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {accounts.map((account) => (
            <AccountCard
              key={account._id}
              account={account}
              onEdit={() => handleOpenModal(account)}
              onDelete={() => handleDeleteAccount(account._id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AccountsTab;
