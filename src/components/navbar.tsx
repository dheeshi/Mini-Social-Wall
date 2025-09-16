import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export const NavBar: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [dark, setDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
            M
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Mini Social Wall
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              React • TypeScript • Firebase
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="hidden sm:inline-block text-sm px-3 py-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Home
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/createpost"
                className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm hidden sm:inline-block hover:bg-slate-200 dark:hover:bg-slate-600"
              >
                Create
              </Link>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDark((prev) => !prev)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {dark ? (
                  <SunIcon className="w-5 h-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                )}
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover border border-slate-300 dark:border-slate-600"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center font-semibold text-sm text-white">
                    {user?.displayName?.charAt(0).toUpperCase() ??
                      user?.email?.charAt(0).toUpperCase() ??
                      "U"}
                  </div>
                )}
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {user?.displayName ?? user?.email?.split("@")[0]}
                </span>
                <button
                  onClick={signUserOut}
                  className="text-sm text-red-600 hover:underline"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
