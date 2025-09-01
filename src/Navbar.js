import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { user, signout } = useAuth();
  const location = useLocation();

  // Only show Sign Out button on /chat or /chatbot route and if signout exists
  const showSignOut = user && typeof signout === "function" && (
    location.pathname === "/chat" || location.pathname === "/chatbot"
  );

  return (
    <header className="w-full bg-white shadow-sm border-b border-emerald-100 p-4 flex justify-between items-center">
      <Link to="/" className="inline-flex items-center gap-2 focus:outline-none">
        <div className="h-8 w-8 rounded-xl bg-emerald-600 grid place-items-center text-white font-black shadow-md transition-all duration-300">
          S
        </div>
        <span className="font-semibold tracking-tight text-lg">SomaAI</span>
      </Link>
      <nav className="flex gap-6 items-center text-sm font-semibold">
        <Link
          to="/lessons"
          className={`hover:text-emerald-700 ${
            location.pathname.startsWith("/lessons") ? "text-emerald-700 underline" : ""
          }`}
        >
          Lessons
        </Link>
        <Link
          to="/chat"
          className={`hover:text-emerald-700 ${
            (location.pathname === "/chat" || location.pathname === "/chatbot") ? "text-emerald-700 underline" : ""
          }`}
        >
          Chatbot
        </Link>
        {showSignOut && (
          <button
            onClick={signout}
            className="ml-3 bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 text-sm"
          >
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
}