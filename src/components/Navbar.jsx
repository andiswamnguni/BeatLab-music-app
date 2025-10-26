import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-white">
            BeatLab
          </Link>
        </div>
      </div>
    </nav>
  );
}