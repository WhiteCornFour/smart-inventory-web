"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  Barcode, 
  BellRing, 
  Box, 
  MessageSquare, 
  Smartphone, 
  Tags,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Box className="w-6 h-6 text-[#F16A2D]" />,
    title: "Inventory Management",
    description: "Full control over import, export, stock adjustments, threshold tracking, and real-time stock health visibility."
  },
  {
    icon: <Tags className="w-6 h-6 text-[#F16A2D]" />,
    title: "Product & Categories",
    description: "Support for product variants, dynamic pricing, multiple images, and unit-level inventory organization."
  },
  {
    icon: <Barcode className="w-6 h-6 text-[#F16A2D]" />,
    title: "Barcode Workflows",
    description: "Accelerate transactions with barcode-assisted product searching and seamless package attachment."
  },
  {
    icon: <BellRing className="w-6 h-6 text-[#F16A2D]" />,
    title: "Automated Notifications",
    description: "Stay ahead with event-driven alerts and scheduled background scans for low-stock events."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-[#F16A2D]" />,
    title: "Insights & Reporting",
    description: "Comprehensive screens for stock status, detailed transaction history, and overall operational overview."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-[#F16A2D]" />,
    title: "Push Notifications",
    description: "Powered by Firebase Admin on the backend and Firebase Messaging on your mobile client for instant updates."
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-[#F16A2D]" />,
    title: "Chatbot-Ready UI",
    description: "Future-proof mobile interface prepared for AI-assisted inventory queries and operational guidance."
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full selection:bg-[#F16A2D]/30">
      
      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F16A2D] to-[#FF8A56] text-white shadow-lg shadow-[#F16A2D]/20">
            <span className="text-xl font-black">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Storix</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-300">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full max-w-6xl mx-auto px-6 pt-24 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 mb-8 backdrop-blur-sm"
        >
          <span className="flex w-2 h-2 rounded-full bg-[#F16A2D] animate-pulse"></span>
          Smart Retail Store Assistant
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight max-w-4xl"
        >
          Intelligent Inventory <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F16A2D] to-[#FFB088]">
            Management System
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mb-12"
        >
          Empower your retail operations with barcode-assisted workflows, real-time insights, and AI-ready mobile management. Designed for ultimate efficiency.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#F16A2D] to-[#E05315] hover:opacity-90 text-white font-semibold transition-all shadow-xl shadow-[#F16A2D]/20 flex items-center justify-center gap-2">
            Download Mobile App
            <Smartphone className="w-5 h-5" />
          </button>
        </motion.div>
      </section>

      {/* Hero Image / Dashboard Mockup */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full aspect-video rounded-[2rem] bg-gray-900/50 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
          {/* Mockup UI representation */}
          <div className="w-full h-full p-8 flex flex-col gap-6 opacity-50 group-hover:opacity-80 transition-opacity duration-700">
             <div className="w-full flex gap-4">
                <div className="h-32 w-1/4 rounded-2xl bg-white/5 border border-white/10"></div>
                <div className="h-32 w-1/4 rounded-2xl bg-[#F16A2D]/10 border border-[#F16A2D]/30"></div>
                <div className="h-32 w-1/4 rounded-2xl bg-white/5 border border-white/10"></div>
                <div className="h-32 w-1/4 rounded-2xl bg-white/5 border border-white/10"></div>
             </div>
             <div className="w-full flex-1 flex gap-4">
                <div className="h-full w-2/3 rounded-2xl bg-white/5 border border-white/10"></div>
                <div className="h-full w-1/3 rounded-2xl bg-white/5 border border-white/10"></div>
             </div>
          </div>
          <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 px-6 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            <CheckCircle2 className="text-[#F16A2D] w-5 h-5" />
            <span className="font-medium text-white/90">Cross-platform synchronization</span>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything you need to scale</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">From barcode scanning to AI-ready chatbots, Storix provides a comprehensive suite of tools to manage your retail inventory.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-[2rem] bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-colors backdrop-blur-md group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F16A2D]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-white/5 text-center mt-20">
        <p className="text-gray-500 text-sm">© 2026 Storix - Smart Retail Store Assistant. All rights reserved.</p>
      </footer>

    </div>
  );
}
