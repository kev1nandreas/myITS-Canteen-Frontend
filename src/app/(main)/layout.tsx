import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ProviderReduxToolkit } from "@/modules/providers/redux_provider";
import QueryProvider from "@/modules/providers/query_provider";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Sidebar from "@/containers/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "myITS Canteen",
  description: "myITS Canteen - A modern canteen management system",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProviderReduxToolkit>
          <QueryProvider>
            <div className="flex flex-col h-screen inset-0 fixed">
              <Header />
              <div className="flex justify-between overflow-hidden h-[calc(100vh-4rem)]">
                <Toaster position="top-center" />
                <Sidebar />
                {children}
              </div>
            </div>
          </QueryProvider>
        </ProviderReduxToolkit>
      </body>
    </html>
  );
}
