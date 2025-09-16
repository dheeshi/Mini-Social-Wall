import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          © {new Date().getFullYear()} Mini Social Wall. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          <Link
            to="#"
            className="text-slate-600 dark:text-slate-400 hover:text-indigo-500"
          >
            About
          </Link>
          <Link
            to="#"
            className="text-slate-600 dark:text-slate-400 hover:text-indigo-500"
          >
            Contact
          </Link>
          <Link
            to="#"
            className="text-slate-600 dark:text-slate-400 hover:text-indigo-500"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};
