"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

interface SidebarItem {
  title: string;
  href: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const sections: SidebarSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/getting-started" },
      { title: "Installation", href: "/docs/getting-started/installation" },
      { title: "Quick Start", href: "/docs/getting-started/quickstart" },
    ],
  },
  {
    title: "VioAVR",
    items: [
      { title: "Overview", href: "/docs/vioavr" },
      { title: "Architecture", href: "/docs/vioavr/architecture" },
      { title: "Peripherals", href: "/docs/vioavr/peripherals" },
      { title: "Co-Simulation", href: "/docs/vioavr/cosimulation" },
      { title: "CLI Tools", href: "/docs/vioavr/cli" },
      { title: "Supported MCUs", href: "/docs/vioavr/supported-mcus" },
    ],
  },
  {
    title: "VioraEDA",
    items: [
      { title: "Overview", href: "/docs/vioraeda" },
      { title: "Schematic Editor", href: "/docs/vioraeda/schematic" },
      { title: "PCB Editor", href: "/docs/vioraeda/pcb" },
      { title: "Simulator", href: "/docs/vioraeda/simulator" },
      { title: "AI Co-Pilot", href: "/docs/vioraeda/ai" },
      { title: "Extensions", href: "/docs/vioraeda/extensions" },
    ],
  },
  {
    title: "FluxScript",
    items: [
      { title: "Overview", href: "/docs/fluxscript" },
      { title: "Language Reference", href: "/docs/fluxscript/language" },
      { title: "Standard Library", href: "/docs/fluxscript/stdlib" },
      { title: "CLI Tools", href: "/docs/fluxscript/cli" },
      { title: "Qt GUI Bridge", href: "/docs/fluxscript/qt" },
      { title: "Extensions & Plugins", href: "/docs/fluxscript/plugins" },
    ],
  },
  {
    title: "FerroMNA",
    items: [
      { title: "Overview", href: "/docs/ferromna" },
      { title: "Features", href: "/docs/ferromna/features" },
      { title: "CLI Reference", href: "/docs/ferromna/cli" },
      { title: "Getting Started", href: "/docs/ferromna/getting-started" },
    ],
  },
  {
    title: "VioMATRIXC",
    items: [
      { title: "Overview", href: "/docs/viomatrixc" },
      { title: "LTspice Compatibility", href: "/docs/viomatrixc/ltspice" },
      { title: "Build Instructions", href: "/docs/viomatrixc/build" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "VioAVR Core API", href: "/docs/api/vioavr-core" },
      { title: "FluxScript Extensions", href: "/docs/api/fluxscript-extensions" },
      { title: "Python Bindings", href: "/docs/api/python" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {sections.map((section) => (
        <div key={section.title} className="mb-6">
          <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
            {section.title}
          </h4>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    "block px-3 py-1.5 rounded-md text-sm transition-colors",
                    pathname === item.href
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
