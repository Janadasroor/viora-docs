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
      <nav className="flex items-center gap-2 text-sm ml-auto">
        <a
          href="https://github.com/Janadasroor"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white flex items-center justify-center"
          aria-label="GitHub Repository"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </a>
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
        <Link href="/docs/getting-started" className="hidden sm:inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors font-medium text-xs">Get Started</Link>
      </nav>
    </header>
  );
}


