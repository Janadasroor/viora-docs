"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Prism: { highlightAll: () => void };
  }
}

const LANGUAGES = ["rust", "bash", "c", "cpp", "python", "json"];

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export function PrismInit() {
  useEffect(() => {
    const base = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0";
    loadScript(base + "/prism.min.js")
      .then(() => Promise.all(LANGUAGES.map((l) => loadScript(base + "/components/prism-" + l + ".min.js"))))
      .then(() => window.Prism?.highlightAll());
  }, []);

  return null;
}
