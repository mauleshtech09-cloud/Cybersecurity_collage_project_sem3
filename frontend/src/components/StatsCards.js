 'use client';
// components/StatsCards.js
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Globe, Cpu } from 'lucide-react';
import { staggerContainer, fadeUp } from '@/animations/animations';

export default function StatsCards() {
  const stats = [
    { label: 'Threats Analyzed', value: '1.2M+', icon: ShieldCheck, color: 'text-[#0077ff]', border: 'border-[#0077ff]/30' },
    { label: 'High Risk Detections', value: '3,492', icon: AlertTriangle, color: 'text-[#ff2a2a]', border: 'border-[#ff2a2a]/30' },
    { label: 'Suspicious Domains', value: '12.4K', icon: Globe, color: 'text-yellow-400', border: 'border-yellow-400/30' },
    { label: 'AI Accuracy Rate', value: '99.8%', icon: Cpu, color: 'text-[#00ff66]', border: 'border-[#00ff66]/30' }
  ];

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            variants={fadeUp}
            className={`glass p-6 rounded-xl border-l-4 ${stat.border} hover:bg-white/10 transition-all group`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <h3 className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
