"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { searchIndex, type SearchResult } from "@/lib/search";

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: "title", weight: 2 },
    { name: "keywords", weight: 1 },
    { name: "section", weight: 0.5 },
  ],
  threshold: 0.4,
  distance: 100,
});

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        setResults([]);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  function close() {
    setOpen(false);
    setQuery("");
    setResults([]);
  }

  function handleChange(value: string) {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    setResults(fuse.search(value).map((r) => r.item));
    setSelectedIndex(0);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      const href = results[selectedIndex].href;
      close();
      router.push(href);
    }
  }

  return (
    <>
      {/* Desktop Search Button */}
      <button
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors
          text-gray-400 dark:text-gray-500
          bg-transparent
          hover:bg-gray-100 dark:hover:bg-gray-800
          border border-gray-200 dark:border-gray-700
          w-48"
      >
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="flex-1 text-left">Search...</span>
        <kbd className="hidden sm:inline-flex text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500">
          ⌘K
        </kbd>
      </button>

      {/* Mobile Search Button */}
      <button
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
        className="flex sm:hidden items-center justify-center p-2 rounded-lg transition-colors
          text-gray-500 dark:text-gray-400 
          hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={close}>
          <div className="fixed inset-0 bg-black/20" />
          <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-gray-950 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-5">
              <svg className="w-5 h-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search documentation..."
                className="flex-1 h-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none text-base"
              />
            </div>

            {results.length > 0 && (
              <ul className="max-h-80 overflow-y-auto border-t border-gray-100 dark:border-gray-800 py-1" role="listbox">
                {results.map((item, i) => (
                  <li
                    key={item.href}
                    role="option"
                    aria-selected={i === selectedIndex}
                    onClick={() => { close(); router.push(item.href); }}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                      i === selectedIndex
                        ? "bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <div>{item.title}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-px">
                      {item.section} &middot; {item.href}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {query && results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800">
                No results found for &ldquo;{query}&rdquo;
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
