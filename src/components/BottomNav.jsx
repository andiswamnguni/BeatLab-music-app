import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();
  
 const navItems = [
  { path: "/", label: "Home" },
  { path: "/song-id", label: "Song ID" },
  { path: "/playlists", label: "Playlists" },
  { path: "/dj", label: "DJ" },
  { path: "/favorites", label: "Favorites" }
];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center py-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm ${
                location.pathname === item.path
                  ? "text-blue-400 font-medium"
                  : "text-gray-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}