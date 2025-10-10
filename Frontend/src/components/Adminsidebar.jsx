import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-blue-900 text-white  flex-col hidden md:flex p-4">
      <h1 className="text-2xl font-bold mb-6">Helping Hand Admin</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/admin/users" className="hover:bg-blue-700 p-2 rounded-lg">
          Users
        </Link>
        <Link
          to="/admin/Alldonations"
          className="hover:bg-blue-700 p-2 rounded-lg"
        >
          Donations
        </Link>
        <Link to="/admin/events" className="hover:bg-blue-700 p-2 rounded-lg">
          Events
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
