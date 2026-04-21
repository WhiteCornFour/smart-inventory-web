import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Inventory Auth",
  description: "Authentication and Verification for Smart Inventory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
    >
      <body className="min-h-screen bg-gray-950 flex flex-col relative overflow-hidden text-gray-50 font-sans">
        {/* Global Animated Background Wrapper */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Subtle moving mesh gradients using Tailwind & CSS shapes */}
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] min-w-[300px] min-h-[300px] bg-[#F16A2D] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-[pulse_10s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] min-w-[400px] min-h-[400px] bg-[#F16A2D]/80 rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-[pulse_12s_ease-in-out_infinite_reverse]" />
          <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] min-w-[200px] min-h-[200px] bg-[#F16A2D]/40 rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-[pulse_8s_ease-in-out_infinite]" />
        </div>

        {/* Main Content Area */}
        <main className="relative z-10 flex flex-col min-h-screen items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
