 'use client';
// components/ThreatResults.js
import { motion } from 'framer-motion';
import { getThreatColors } from '@/utils/threatColors';
import { AlertCircle, CheckCircle2, ShieldAlert, Cpu, CheckSquare } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/animations/animations';

export default function ThreatResults({ result }) {
  if (!result) return null;

  const colors = getThreatColors(result.threat_level);
  
  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="py-10 px-6 max-w-4xl mx-auto"
      id="results"
    >
      <div className={`glass rounded-2xl overflow-hidden border-2 ${colors.border} ${colors.glow}`}>
        
        {/* Header */}
        <div className={`p-6 ${colors.bg} border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full bg-black/30 ${colors.text}`}>
              {result.threat_level === 'HIGH' || result.threat_level === 'DANGEROUS' ? 
                <ShieldAlert className="w-8 h-8" /> : 
                (result.threat_level === 'SAFE' || result.threat_level === 'LOW' ? 
                  <CheckCircle2 className="w-8 h-8" /> : 
                  <AlertCircle className="w-8 h-8" />
                )
              }
            </div>
            <div>
              <p className="text-sm text-gray-400 font-mono uppercase">Threat Level</p>
              <h2 className={`text-4xl font-bold tracking-wider ${colors.text} ${result.threat_level === 'HIGH' ? 'neon-text-primary text-[#ff2a2a] shadow-[#ff2a2a]' : ''}`}>
                {result.threat_level} {result.threat_level === 'HIGH' ? '🔴' : ''}
              </h2>
            </div>
          </div>
          
          <div className="text-right flex items-center gap-4 md:block">
             <div className="hidden md:block">
                <p className="text-sm text-gray-400 font-mono uppercase">Phishing Score</p>
             </div>
             <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
                  <circle 
                    cx="40" cy="40" r="36" 
                    stroke="currentColor" 
                    strokeWidth="6" fill="none" 
                    strokeDasharray="226" 
                    strokeDashoffset={226 - (226 * parseInt(result.phishing_score)) / 100}
                    className={`${colors.text} transition-all duration-1000 ease-out`}
                  />
                </svg>
                <span className="absolute text-lg font-bold text-white">{result.phishing_score}</span>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8 bg-black/60">
          
          {/* Category & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-4 rounded-xl border border-white/5">
              <p className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#0077ff]" /> Threat Category
              </p>
              <p className="text-xl text-white font-semibold">{result.threat_category}</p>
            </div>
            
            <div className="flex flex-col justify-center gap-3">
              <div className="flex items-center justify-between glass px-4 py-2 rounded-lg border border-white/5">
                <span className="text-sm text-gray-300">Malware Scan:</span>
                <span className="text-sm font-mono text-[#00ff66] flex items-center gap-1">
                  {result.malware_detected === 'No' ? <><CheckCircle2 className="w-4 h-4"/> Clean</> : <><ShieldAlert className="w-4 h-4 text-[#ff2a2a]"/> Detected</>}
                </span>
              </div>
              <div className="flex items-center justify-between glass px-4 py-2 rounded-lg border border-white/5">
                <span className="text-sm text-gray-300">Virus Indicators:</span>
                <span className="text-sm font-mono text-[#00ff66] flex items-center gap-1">
                  {result.virus_detected === 'No' ? <><CheckCircle2 className="w-4 h-4"/> Clean</> : <><ShieldAlert className="w-4 h-4 text-[#ff2a2a]"/> Detected</>}
                </span>
              </div>
            </div>
          </div>

          {/* AI Findings List */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#0077ff]" /> AI Analysis Findings
            </h3>
            <motion.ul 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {result.findings?.map((finding, idx) => (
                <motion.li 
                  key={idx}
                  variants={fadeUp}
                  className="flex items-start gap-3 glass p-3 rounded-lg border-l-2 border-[#0077ff]"
                >
                  <CheckSquare className="w-5 h-5 text-[#0077ff] shrink-0 mt-0.5" />
                  <span className="text-gray-300">{finding}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Recommendation */}
          <div className="mt-8 bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" /> Recommended Action
            </h3>
            <p className="text-white text-lg whitespace-pre-line">{result.recommendation}</p>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
