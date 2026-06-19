"use client";

import Link from "next/link";

import { useTheme } from "./ThemeProvider";
import { Search } from "./Search";

export function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center px-6 gap-4
      bg-white dark:bg-gray-950 
      border-b border-gray-200 dark:border-gray-800">
      <Link href="/" className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">V</div>
        <span className="text-xl font-bold">Viora Docs</span>
      </Link>
      <Search />
      <nav className="flex items-center gap-4 text-sm ml-auto">
        <button
          onClick={toggle}
          className="p-2 rounded-lg transition-colors
            text-gray-500 dark:text-gray-400 
            hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === "dark" ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        <a href="https://github.com/Janadasroor" target="_blank" rel="noopener noreferrer" className="hidden sm:inline text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">GitHub</a>
        <a href="/docs/getting-started" className="hidden sm:inline text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium text-blue-600 dark:text-blue-400">Get Started</a>
      </nav>
    </header>
  );
}


