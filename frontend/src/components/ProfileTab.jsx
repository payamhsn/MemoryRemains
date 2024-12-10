// import { motion } from "framer-motion";
// import { useAuthStore } from "../store/authStore";
// import { formatDate } from "../utils/date";
// import { useState } from "react";
// import EditProfileModal from "./EditProfileModal";
// import { Pencil } from "lucide-react";

// const ProfileTab = () => {
//   const { user } = useAuthStore();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-2xl font-semibold text-green-400">
//           Profile Information
//         </h3>
//         <button
//           onClick={handleOpenModal}
//           className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full flex items-center transition duration-300"
//         >
//           <Pencil size={16} className="mr-1" />
//           Edit
//         </button>
//       </div>
//       <div className="space-y-4">
//         <p className="text-gray-300">
//           <span className="font-bold">Name:</span> {user.name}
//         </p>
//         <p className="text-gray-300">
//           <span className="font-bold">Email:</span> {user.email}
//         </p>
//         <p className="text-gray-300">
//           <span className="font-bold">Joined:</span>{" "}
//           {formatDate(user.createdAt)}
//         </p>
//         <p className="text-gray-300">
//           <span className="font-bold">Previous Login:</span>{" "}
//           {user.previousLogin ? formatDate(user.previousLogin) : "N/A"}
//         </p>
//         <p className="text-gray-300">
//           <span className="font-bold">Current Login:</span>{" "}
//           {formatDate(user.lastLogin)}
//         </p>
//       </div>
//       <EditProfileModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         user={user}
//       />
//     </motion.div>
//   );
// };

// export default ProfileTab;

import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate, getTimeDifference } from "../utils/date";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { Pencil } from "lucide-react";

const ProfileTab = () => {
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const loginDifference = user.previousLogin
    ? getTimeDifference(user.lastLogin, user.previousLogin)
    : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-green-400">
          Profile Information
        </h3>
        <button
          onClick={handleOpenModal}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full flex items-center transition duration-300"
        >
          <Pencil size={16} className="mr-1" />
          Edit
        </button>
      </div>
      <div className="space-y-4">
        <p className="text-gray-300">
          <span className="font-bold">Name:</span> {user.name}
        </p>
        <p className="text-gray-300">
          <span className="font-bold">Email:</span> {user.email}
        </p>
        <p className="text-gray-300">
          <span className="font-bold">Joined:</span>{" "}
          {formatDate(user.createdAt)}
        </p>
        <p className="text-gray-300">
          <span className="font-bold">Previous Login:</span>{" "}
          {user.previousLogin ? formatDate(user.previousLogin) : "N/A"}
        </p>
        <p className="text-gray-300">
          <span className="font-bold">Current Login:</span>{" "}
          {formatDate(user.lastLogin)}
        </p>
        <p className="text-gray-300">
          <span className="font-bold">
            Elapsed time between previous and current login:
          </span>{" "}
          {loginDifference}
        </p>
      </div>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={user}
      />
    </motion.div>
  );
};

export default ProfileTab;
