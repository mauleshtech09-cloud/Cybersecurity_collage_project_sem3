 'use client';
// components/UpgradeCards.js
import { motion } from 'framer-motion';
import { Shield, Zap, Lock, Smartphone, Database, Globe } from 'lucide-react';
import { staggerContainer, fadeUp } from '@/animations/animations';

export default function UpgradeCards() {
  const upgrades = [
    { title: 'Real-Time Monitoring', icon: Zap, desc: '24/7 automated scanning of incoming communications.' },
    { title: 'Live Domain Reputation', icon: Globe, desc: 'Instant integration with global threat intelligence feeds.' },
    { title: 'Attachment Analysis', icon: Lock, desc: 'Deep sandbox detonation for malicious file detection.' },
    { title: 'WhatsApp Alerts', icon: Smartphone, desc: 'Instant SOC alerts delivered via WhatsApp API.' },
    { title: 'SOC Automation', icon: Database, desc: 'Automated playbook execution for threat mitigation.' },
    { title: 'Advanced AI Intel', icon: Shield, desc: 'Custom LLM fine-tuning for your specific threat landscape.' },
  ];

  return (
    <section id="upgrades" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-white">Future <span className="text-purple-400 neon-text-primary">Capabilities</span></h2>
        <p className="text-gray-400">Scalable modules to expand your cybersecurity defense infrastructure.</p>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {upgrades.map((mod, i) => (
          <motion.div 
            key={i}
            variants={fadeUp}
            className="glass p-6 rounded-xl border border-white/5 hover:border-purple-400/30 transition-all hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <mod.icon className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{mod.title}</h3>
            <p className="text-gray-400 text-sm">{mod.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
