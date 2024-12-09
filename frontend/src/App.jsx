import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";

import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#054A91] via-[#3E7CB1] to-[#81A4CD]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center relative overflow-hidden">
        <div className="flex flex-col items-center justify-center container mx-auto px-4 max-w-6xl">
          <FloatingShape
            color="bg-green-500"
            size="w-64 h-64"
            top="-5%"
            left="10%"
            delay={0}
          />
          <FloatingShape
            color="bg-emerald-500"
            size="w-48 h-48"
            top="70%"
            left="80%"
            delay={5}
          />
          <FloatingShape
            color="bg-lime-500"
            size="w-32 h-32"
            top="40%"
            left="-10%"
            delay={2}
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/signup"
              element={
                <RedirectAuthenticatedUser>
                  <SignUpPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/login"
              element={
                <RedirectAuthenticatedUser>
                  <LoginPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
