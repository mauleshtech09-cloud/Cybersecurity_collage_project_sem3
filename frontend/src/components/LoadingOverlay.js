 'use client';
// components/LoadingOverlay.js
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LoadingOverlay({ isVisible }) {
  const [loadingText, setLoadingText] = useState('Scanning Threat Intelligence...');
  
  const messages = [
    'Scanning Threat Intelligence...',
    'Analyzing Suspicious Patterns...',
    'Detecting Credential Theft...',
    'Running AI Threat Analysis...',
    'Evaluating Domain Reputation...'
  ];

  useEffect(() => {
    if (!isVisible) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      setLoadingText(messages[currentIndex]);
    }, 800);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
        >
          <div className="relative">
            {/* Cyber Scanning Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-32 h-32 rounded-full border-t-2 border-r-2 border-[#00ff66] glow-primary opacity-50"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="w-28 h-28 rounded-full border-b-2 border-l-2 border-[#0077ff] glow-secondary absolute top-2 left-2 opacity-50"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Radar className="w-10 h-10 text-[#00ff66] animate-pulse" />
            </div>
          </div>
          
          <div className="mt-8 flex flex-col items-center gap-3">
            <h3 className="text-xl font-bold text-[#00ff66] neon-text-primary tracking-widest uppercase">
              Analyzing Target
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
              <Terminal className="w-4 h-4" />
              <span>{loadingText}</span>
            </div>
            
            <div className="w-64 h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1/2 h-full bg-[#00ff66] glow-primary"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
