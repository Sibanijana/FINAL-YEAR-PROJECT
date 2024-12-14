import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">SJ Routine Services</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/admin" className="hover:text-gray-200">
              Admin
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
