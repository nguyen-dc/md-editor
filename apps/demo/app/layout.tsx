import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@md-editor/ui/dist/index.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "RSC UI Library Demo",
  description: "Next.js App Router + React Server Components + @md-editor/ui"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

