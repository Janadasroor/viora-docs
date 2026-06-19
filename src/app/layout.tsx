import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { TableOfContents } from "@/components/TableOfContents";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MobileMenu } from "@/components/MobileMenu";
import { PrismInit } from "@/components/PrismInit";

export const metadata: Metadata = {
  title: "Viora Documentation",
  description: "Documentation for Viora EDA ecosystem — VioAVR, VioraEDA, FluxScript, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const mq = window.matchMedia('(prefers-color-scheme: dark)');
                if (mq.matches) document.documentElement.classList.add('dark');
              })();
            `,
          }}
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <Header />
          <Sidebar />
          <main className="main-content prose dark:prose-invert">
            {children}
          </main>
          <TableOfContents />
          <MobileMenu />
        </ThemeProvider>
        <PrismInit />
      </body>
    </html>
  );
}
