import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Create Routine</h2>
          <p className="text-gray-600 mb-4">
            Add routine details for a department.
          </p>
          <Link
            to="/create-routine"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Routine
          </Link>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Export Routines</h2>
          <p className="text-gray-600 mb-4">
            Export routines to Excel or PDF for departmental use.
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
