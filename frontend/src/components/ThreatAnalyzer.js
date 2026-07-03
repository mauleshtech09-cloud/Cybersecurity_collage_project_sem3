'use client';
// components/ThreatAnalyzer.js
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radar, Mail, Link as LinkIcon, FileText, User } from 'lucide-react';

export default function ThreatAnalyzer({ onAnalyze, onLoadingChange }) {
  const [formData, setFormData] = useState({
    sender: '',
    subject: '',
    url: '',
    content: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.sender && !formData.url && !formData.content) return;

    // Trigger loading state via prop and local state
    setIsProcessing(true);
    if (onLoadingChange) onLoadingChange(true);

    try {
      // Direct call to Make.com webhook as per exact requirement
      const response = await fetch(
        "https://hook.us2.make.com/c5b7u8yimsq07486vntqfet8wojmlqqu",
        { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender_email: formData.sender,
            subject_line: formData.subject,
            suspicious_url: formData.url,
            email_content: formData.content,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Webhook responded with status: ${response.status}`);
      }

      // Robust JSON Validation to prevent "Unexpected token 'A', 'Accepted' is not valid JSON"
      const textResponse = await response.text();
      let data;
      
      try {
        data = JSON.parse(textResponse);
      } catch (err) {
        console.error("Invalid JSON from webhook. Received:", textResponse);
        
        // Exact handling for the 'Accepted' string issue
        if (textResponse.trim() === "Accepted") {
          throw new Error("Webhook returned 'Accepted' plain text instead of JSON. Ensure your Make.com scenario ends with a Webhook Response module returning valid JSON.");
        }
        
        throw new Error("Received invalid JSON from webhook.");
      }

      // Pass successful data to parent
      onAnalyze(data);

    } catch (error) {
      console.error("Webhook Error:", error);

      // Gracefully handle errors and render them as threat results
      onAnalyze({
        threat_level: "ERROR",
        phishing_score: "0%",
        threat_category: "Connection Failed",
        findings: [
          error.message || "Webhook connection failed",
          "Ensure your Make.com scenario is turned ON.",
          "Ensure Make.com returns proper application/json headers."
        ],
        malware_detected: "Unknown",
        virus_detected: "Unknown",
        recommendation: "Review the Make.com integration architecture and confirm the final response payload."
      });
    } finally {
      setIsProcessing(false);
      if (onLoadingChange) onLoadingChange(false);
    }
  };

  return (
    <section id="analyzer" className="py-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 text-white">Threat <span className="text-[#00ff66] neon-text-primary">Intelligence Scanner</span></h2>
        <p className="text-gray-400">Input suspicious details below for military-grade AI analysis.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00ff66] to-transparent opacity-50"></div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <User className="w-4 h-4 text-[#00ff66]" /> Sender Email
              </label>
              <input 
                type="email" 
                name="sender"
                value={formData.sender}
                onChange={handleChange}
                placeholder="suspicious@example.com"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66] transition-all placeholder-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-[#00ff66]" /> Suspicious URL
              </label>
              <input 
                type="url" 
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://secure-login-update.com"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66] transition-all placeholder-gray-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#00ff66]" /> Subject Line
            </label>
            <input 
              type="text" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="URGENT: Verify your account details immediately"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66] transition-all placeholder-gray-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00ff66]" /> Email Message Content
            </label>
            <textarea 
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={4}
              placeholder="Paste the email content here for deep analysis..."
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66] transition-all placeholder-gray-600 resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full bg-[#00ff66]/10 border border-[#00ff66] text-[#00ff66] font-bold py-4 rounded-lg hover:bg-[#00ff66] hover:text-black transition-all glow-primary flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Radar className={`w-5 h-5 ${isProcessing ? 'animate-spin' : 'group-hover:animate-ping'}`} />
            {isProcessing ? 'Processing Intelligence...' : 'Analyze Threat'}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
