import { Link } from "react-router-dom";
import { Key, Shield, Clock, Heart } from "lucide-react";

const Feature = ({ icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-white bg-opacity-10 rounded-lg shadow-lg hover:bg-opacity-20 transition-all duration-300">
    {icon}
    <h3 className="mt-4 text-xl font-semibold">{title}</h3>
    <p className="mt-2 text-center">{description}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <div className="max-w-5xl mx-auto text-center p-8">
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          MemoryRemains
        </h1>
        <p className="text-2xl mb-12 max-w-3xl mx-auto">
          Preserve your digital legacy. Ensure your loved ones can access
          important information and memories when you're no longer able to.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Feature
            icon={<Key size={48} className="text-blue-300" />}
            title="Secure Digital Vault"
            description="Safely store sensitive information, account details, and personal messages for your loved ones."
          />
          <Feature
            icon={<Shield size={48} className="text-green-300" />}
            title="Protected Access"
            description="Designate trusted individuals who can access your information when the time comes."
          />
          <Feature
            icon={<Clock size={48} className="text-yellow-300" />}
            title="Time-Based Release"
            description="Set custom inactivity periods to ensure timely access to your digital legacy."
          />
          <Feature
            icon={<Heart size={48} className="text-red-300" />}
            title="Peace of Mind"
            description="Rest easy knowing your digital affairs are in order for your loved ones."
          />
        </div>
        <div className="space-x-6">
          <Link
            to="/signup"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-lg"
          >
            Secure Your Legacy
          </Link>
          <Link
            to="/login"
            className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
