 'use client';
// components/HeroSection.js
import { motion } from 'framer-motion';
import { ShieldAlert, Activity } from 'lucide-react';
import { fadeUp, pulseGlow } from '@/animations/animations';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00ff66]/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.div
          variants={pulseGlow}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#00ff66]/30 text-[#00ff66] text-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse"></span>
          AI-Powered Threat Intelligence Active
        </motion.div>

        <motion.h1 
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Next-Gen</span>{' '}
          <span className="neon-text-primary text-[#00ff66]">PhishGuard AI</span>
        </motion.h1>

        <motion.p 
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Analyze suspicious emails, URLs, and phishing attempts using military-grade AI-powered cybersecurity automation.
        </motion.p>

        <motion.div 
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#analyzer" className="flex items-center gap-2 px-8 py-4 bg-[#00ff66] text-black font-bold rounded-lg hover:bg-[#00ff66]/90 transition-all glow-primary">
            <ShieldAlert className="w-5 h-5" />
            Start Threat Analysis
          </a>
          <a href="#dashboard" className="flex items-center gap-2 px-8 py-4 glass text-white font-bold rounded-lg hover:bg-white/10 transition-all border border-white/20">
            <Activity className="w-5 h-5" />
            View Threat Dashboard
          </a>
        </motion.div>
      </div>
    </section>
  );
}
