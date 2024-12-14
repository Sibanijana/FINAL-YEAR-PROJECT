import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to Routine Management System
      </h1>
      <p className="text-lg mb-6">
        Manage department routines effectively with ease.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/admin"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
