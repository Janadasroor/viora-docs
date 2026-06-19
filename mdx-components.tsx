import type { MDXComponents } from "mdx/types";
import { PreWithCopy } from "@/components/PreWithCopy";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-4xl font-extrabold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-3 border-b border-gray-200 pb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>,
    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    a: ({ href, children }) => {
      const isExternal = href?.startsWith("http://") || href?.startsWith("https://") || href?.startsWith("//");
      if (isExternal) {
        return (
          <a
            href={href}
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href || "#"} className="text-blue-600 underline hover:text-blue-800">
          {children}
        </Link>
      );
    },
    pre: ({ children }) => (
      <PreWithCopy>{children}</PreWithCopy>
    ),
    code: ({ children, className, ...props }) => {
      const isInline = !className;
      if (isInline) {
        return <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm text-rose-600 font-mono">{children}</code>;
      }
      return <code className={className} {...props}>{children}</code>;
    },
    table: ({ children }) => <table className="w-full border-collapse mb-4">{children}</table>,
    th: ({ children }) => <th className="border border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold">{children}</th>,
    td: ({ children }) => <td className="border border-gray-200 px-3 py-2">{children}</td>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 text-gray-500 my-4">{children}</blockquote>,
    hr: () => <hr className="border-gray-200 my-8" />,
    img: ({ src, alt }) => <img src={src} alt={alt} className="rounded-lg my-4" />,
    ...components,
  };
}
