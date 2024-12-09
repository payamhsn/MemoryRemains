import React from "react";
import { Link } from "react-router-dom";
import { Shield, UserPlus, Lock, Layout } from "lucide-react";

const Feature = ({ icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-white bg-opacity-10 rounded-lg shadow-lg">
    {icon}
    <h3 className="mt-4 text-xl font-semibold">{title}</h3>
    <p className="mt-2 text-center">{description}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <div className="max-w-4xl mx-auto text-center p-8">
        <h1 className="text-5xl font-bold mb-6">Welcome to MernStarter Ver3</h1>
        <p className="text-xl mb-8">
          A robust authentication solution built with the MERN stack, designed
          for developers who value security and efficiency.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Feature
            icon={<Shield size={40} />}
            title="Secure Authentication"
            description="Implement user registration with email verification, ensuring a safe and verified user base."
          />
          <Feature
            icon={<UserPlus size={40} />}
            title="User Management"
            description="Effortlessly handle user sign-up, login, and logout functionalities with our intuitive system."
          />
          <Feature
            icon={<Lock size={40} />}
            title="Protected Routes"
            description="Safeguard sensitive areas of your application with our robust route protection mechanism."
          />
          <Feature
            icon={<Layout size={40} />}
            title="Dashboard Integration"
            description="Seamlessly integrate a personalized dashboard for each authenticated user."
          />
        </div>
        <div className="space-x-4">
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
