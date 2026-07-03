 'use client';
import { Shield, Code, Terminal, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-[#00ff66]" />
          <span className="text-xl font-bold text-white tracking-wider">
            PhishGuard <span className="text-[#00ff66]">AI</span>
          </span>
        </div>
        
        <div className="text-gray-500 text-sm">
          Developed by <span className="text-gray-300">[Developer Name Placeholder]</span> &bull; AI Cybersecurity Platform
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="p-2 glass rounded-full hover:text-[#00ff66] transition-colors text-gray-400">
            <Code className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 glass rounded-full hover:text-[#00ff66] transition-colors text-gray-400">
            <Terminal className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 glass rounded-full hover:text-[#00ff66] transition-colors text-gray-400">
            <Globe className="w-5 h-5" />
          </a>
        </div>
        
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 h-px bg-gradient-to-r from-transparent via-[#00ff66]/20 to-transparent"></div>
    </footer>
  );
}
