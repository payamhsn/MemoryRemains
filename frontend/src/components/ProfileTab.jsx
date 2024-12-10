import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";

const ProfileTab = () => {
  const { user } = useAuthStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-semibold text-green-400 mb-6">
        Profile Information
      </h3>
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
          <span className="font-bold">Last Login:</span>{" "}
          {formatDate(user.lastLogin)}
        </p>
      </div>
    </motion.div>
  );
};

export default ProfileTab;

// import { useAuthStore } from "../store/authStore";

// const ProfileTab = () => {
//   const { user} = useAuthStore();

//   return (
//     <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-xl font-semibold text-green-400">
//           Profile Information
//         </h3>

//       </div>
//       <p className="text-gray-300">Name: {user.name}</p>
//       <p className="text-gray-300">Email: {user.email}</p>

//     </div>
//   );
// };

// export default ProfileTab;
