import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 shadow-lg z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center py-4">
          <Link to="/" className="text-2xl font-bold text-white">
            BeatLab
          </Link>
        </div>
      </div>
    </nav>
  );
}