import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthContext";
import { QueryProvider } from "@/lib/react-query/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Momento - Social Network",
  description: "Momento Social Network Application",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
