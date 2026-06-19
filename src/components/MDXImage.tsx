"use client";

import { useState, useEffect } from "react";

interface MDXImageProps {
  src?: string;
  alt?: string;
}

export function MDXImage({ src, alt }: MDXImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const openLightbox = () => {
    setIsOpen(true);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 }); // reset position on zoom out
      return next;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale === 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!src) return null;

  return (
    <>
      <div className="relative group cursor-zoom-in my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md">
        <img
          src={src}
          alt={alt || "Image"}
          onClick={openLightbox}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {alt && (
          <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 text-center">
            {alt}
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300"
          onClick={closeLightbox}
        >
          {/* Controls Header */}
          <div 
            className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-6 bg-gradient-to-b from-black/50 to-transparent text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-sm font-medium text-gray-300 truncate max-w-[60%]">
              {alt || "Image Viewer"}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                disabled={scale === 1}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40 transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-xs font-semibold px-2 min-w-[3rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={scale === 4}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40 transition-colors cursor-pointer"
                title="Zoom In"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button
                onClick={closeLightbox}
                className="p-2 ml-4 rounded-lg bg-white/10 hover:bg-white/20 hover:text-red-400 transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image Wrapper */}
          <div
            className="w-full h-full flex items-center justify-center p-4 overflow-hidden"
            onClick={closeLightbox}
          >
            <img
              src={src}
              alt={alt || "Image"}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onClick={(e) => e.stopPropagation()}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
                transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                maxWidth: "90%",
                maxHeight: "80%",
                objectFit: "contain",
              }}
              className="select-none rounded-sm shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
