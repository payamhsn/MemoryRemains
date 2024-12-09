import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          MernStarter
        </Link>
        <div>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="mr-4">
                Dashboard
              </Link>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/signup" className="bg-green-500 px-4 py-2 rounded">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
