"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = document.querySelectorAll("main h2, main h3");
    const items: TocItem[] = [];

    const seenIds = new Map<string, number>();
    elements.forEach((el) => {
      let id = el.id || el.textContent?.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "heading";
      
      if (seenIds.has(id)) {
        const count = seenIds.get(id)! + 1;
        seenIds.set(id, count);
        id = `${id}-${count}`;
      } else {
        seenIds.set(id, 1);
      }

      if (!el.id) el.id = id;
      items.push({
        id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      });
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (headings.length < 3) return null;

  return (
    <nav className="hidden xl:block fixed right-8 top-24 w-56 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        On This Page
      </p>
      <ul className="space-y-1 border-l border-gray-200">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block text-sm py-1 transition-colors border-l -ml-px ${
                heading.level === 3 ? "pl-6" : "pl-3"
              } ${
                activeId === heading.id
                  ? "border-blue-500 text-blue-600 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
