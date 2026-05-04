"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Smartphone, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  const [status, setStatus] = useState<"loading" | "success">("loading");

  useEffect(() => {
    // Simulate a brief verification process for aesthetic UX
    const timer = setTimeout(() => {
      setStatus("success");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-4 selection:bg-[#F16A2D]/30">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
        <img src="/favicon.ico" alt="Storix Logo" className="w-8 h-8 object-contain rounded-lg shadow-sm" />
        <span className="font-medium tracking-tight">Storix</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        {/* Glow effect behind card */}
        <div className={`absolute -inset-1 rounded-[2.5rem] blur-2xl transition-all duration-1000 opacity-20 ${status === 'loading' ? 'bg-[#F16A2D] animate-pulse' : 'bg-emerald-500'}`} />
        
        <div className="relative p-8 sm:p-10 rounded-[2rem] bg-gray-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col items-center text-center overflow-hidden">
          
          {/* Top accent line */}
          <div className={`absolute top-0 left-0 right-0 h-1 transition-colors duration-1000 ${status === 'loading' ? 'bg-[#F16A2D]' : 'bg-emerald-500'}`} />

          <div className="relative flex items-center justify-center h-28 w-28 mb-8">
            <AnimatePresence mode="wait">
              {status === "loading" ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-white/5 border border-white/10 shadow-inner"
                >
                  <Loader2 className="w-10 h-10 text-[#F16A2D] animate-spin" />
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white shadow-xl shadow-emerald-500/30"
                >
                  <ShieldCheck className="w-12 h-12" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pulsing rings for loading state */}
            {status === "loading" && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-[#F16A2D]/20 animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-2 rounded-full border-2 border-[#F16A2D]/10 animate-ping" style={{ animationDuration: '2.5s' }} />
              </>
            )}
          </div>

          <div className="space-y-4 w-full">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {status === "loading" ? "Verifying Account" : "Verification Complete"}
            </h1>
            
            <div className="h-12 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={status}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm sm:text-base text-gray-400 font-medium leading-relaxed"
                >
                  {status === "loading" 
                    ? "Please wait while we confirm your identity and secure your session." 
                    : "Your email has been successfully verified. You are now securely authenticated."}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {status === "success" && (
              <motion.div 
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                transition={{ delay: 0.2 }}
                className="w-full mt-8"
              >
                <Link href="/" className="w-full py-3.5 rounded-xl bg-white text-gray-950 font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg">
                  Continue to Web Portal
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}
