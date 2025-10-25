import React from "react"; // ✅ add this line
import ReactDOM from "react-dom/client";
import App from "./App";
import { PlaylistProvider } from "./context/PlaylistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlaylistProvider>
      <App />
    </PlaylistProvider>
  </React.StrictMode>
);
