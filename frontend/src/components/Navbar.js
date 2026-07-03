 'use client';
// components/Navbar.js
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="w-full glass fixed top-0 z-50 border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Shield className="w-8 h-8 text-[#00ff66] glow-primary" />
          <span className="text-xl font-bold tracking-wider text-white neon-text-primary">
            PhishGuard <span className="text-[#00ff66]">AI</span>
          </span>
        </motion.div>
        
        <div className="hidden md:flex gap-6 text-sm text-gray-300">
          <a href="#analyzer" className="hover:text-[#00ff66] transition-colors">Analyzer</a>
          <a href="#dashboard" className="hover:text-[#00ff66] transition-colors">Dashboard</a>
          <a href="#upgrades" className="hover:text-[#00ff66] transition-colors">Upgrades</a>
        </div>
        
        <button className="bg-[#00ff66]/10 border border-[#00ff66] text-[#00ff66] px-4 py-2 rounded-lg hover:bg-[#00ff66]/20 transition-all glow-primary text-sm font-medium">
          SOC Login
        </button>
      </div>
    </nav>
  );
}
