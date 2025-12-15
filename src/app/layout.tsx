import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GateTix - Event Ticketing Platform",
  description: "Discover amazing events and book tickets instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
