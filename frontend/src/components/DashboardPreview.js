'use client';
// components/DashboardPreview.js
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, CheckCircle, Activity, Loader2 } from 'lucide-react';
import { fadeUp } from '@/animations/animations';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const SHEET_URL = 'https://opensheet.elk.sh/1FnpklJausqsNAUq3sgRN6W3nPxkKVYRwCgFZqHJEPK8/Phishguard_ai_google_sheets_headers';

// Helper for case-insensitive / whitespace-insensitive property lookup from Google Sheets
const getSheetValue = (row, keyName, fallbackKey) => {
  if (!row) return undefined;
  if (row[keyName] !== undefined) return row[keyName];
  if (fallbackKey && row[fallbackKey] !== undefined) return row[fallbackKey];
  
  const cleanTarget = keyName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanFallback = fallbackKey ? fallbackKey.toLowerCase().replace(/[^a-z0-9]/g, '') : null;
  
  const foundKey = Object.keys(row).find(k => {
    const cleanK = k.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanK === cleanTarget || (cleanFallback && cleanK === cleanFallback);
  });
  
  return foundKey ? row[foundKey] : undefined;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 border border-white/10 p-3 rounded-lg backdrop-blur-md shadow-xl z-50">
        <p className="text-white text-sm font-semibold">{label || payload[0].name}</p>
        <p className="text-[#0077ff] text-sm">
          {payload[0].value} incidents
        </p>
      </div>
    );
  }
  return null;
};

export default function DashboardPreview() {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(SHEET_URL);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      if (data && data.length > 0) {
        console.log("Live Sheet sample row:", data[0]);
      }
      setThreats(data || []);
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching threat data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Data Transformations
  const { kpiData, severityData, impersonationData, recentThreats } = useMemo(() => {
    if (!threats || threats.length === 0) {
      return { kpiData: [], severityData: [], impersonationData: [], recentThreats: [] };
    }

    const total = threats.length;
    let criticalCount = 0;
    let highCount = 0;
    let lowCount = 0;
    let totalScore = 0;
    const brandCounts = {};

    // Parse everything properly with safe field fallbacks and case-insensitive lookup
    threats.forEach(t => {
      const rawLevel = getSheetValue(t, 'threatLevel', 'level');
      const level = (rawLevel || '').toString().toUpperCase();
      if (level === 'CRITICAL') criticalCount++;
      else if (level === 'HIGH') highCount++;
      else if (level === 'LOW') lowCount++;

      const rawScore = getSheetValue(t, 'phishingScore', 'score');
      const score = parseInt(rawScore) || 0;
      totalScore += score;

      const rawBrand = getSheetValue(t, 'brandImpersonation', 'brand');
      const brandClean = (rawBrand || '').toString().trim();
      
      // Filter out empty, none, n/a, unknown, null, undefined, 0, no
      const ignoreValues = ['none', 'n/a', 'unknown', '', 'null', 'undefined', '-', 'no', '0', 'false'];
      if (brandClean && !ignoreValues.includes(brandClean.toLowerCase())) {
        const lowerKey = brandClean.toLowerCase();
        let displayBrand = brandClean;
        if (lowerKey === 'paypal') displayBrand = 'PayPal';
        else if (lowerKey === 'github') displayBrand = 'GitHub';
        else if (lowerKey === 'linkedin') displayBrand = 'LinkedIn';
        else if (lowerKey === 'microsoft') displayBrand = 'Microsoft';
        else if (lowerKey === 'amazon') displayBrand = 'Amazon';
        else if (lowerKey === 'helpdesk') displayBrand = 'Helpdesk';
        else if (lowerKey === 'google') displayBrand = 'Google';
        else if (lowerKey === 'apple') displayBrand = 'Apple';
        else if (lowerKey === 'netflix') displayBrand = 'Netflix';
        else if (lowerKey === 'facebook') displayBrand = 'Facebook';
        else {
          displayBrand = brandClean.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        }

        brandCounts[displayBrand] = (brandCounts[displayBrand] || 0) + 1;
      }
    });

    const avgScore = total > 0 ? Math.round(totalScore / total) : 0;
    const safeUrlPercentage = total > 0 ? ((lowCount / total) * 100).toFixed(1) : 0;

    const kpis = [
      { label: 'Total Scans', value: total.toLocaleString(), icon: Activity, color: 'text-[#0077ff]', border: 'border-[#0077ff]/30', bg: 'bg-[#0077ff]/10' },
      { label: 'Critical Threats', value: criticalCount.toLocaleString(), icon: AlertTriangle, color: 'text-[#ff2a2a]', border: 'border-[#ff2a2a]/30', bg: 'bg-[#ff2a2a]/10' },
      { label: 'Safe URLs', value: `${safeUrlPercentage}%`, icon: CheckCircle, color: 'text-[#00ff66]', border: 'border-[#00ff66]/30', bg: 'bg-[#00ff66]/10' },
      { label: 'Avg Threat Score', value: `${avgScore}/100`, icon: ShieldAlert, color: 'text-purple-400', border: 'border-purple-400/30', bg: 'bg-purple-400/10' },
    ];

    const severities = [
      { name: 'Critical', value: criticalCount, color: '#ff2a2a' },
      { name: 'High', value: highCount, color: '#ff7300' },
      { name: 'Low', value: lowCount, color: '#00ff66' },
    ].filter(s => s.value > 0); 

    const sortedBrands = Object.entries(brandCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const colors = ['#ff9900', '#003087', '#ffffff', '#0077ff', '#ff2a2a'];
    const impData = sortedBrands.map((b, i) => ({ ...b, fill: colors[i % colors.length] }));

    const recent = [...threats].reverse().slice(0, 10);

    return { kpiData: kpis, severityData: severities, impersonationData: impData, recentThreats: recent };
  }, [threats]);


  if (loading && threats.length === 0) {
    return (
      <section id="dashboard" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 text-[#0077ff] animate-spin mb-4" />
        <p className="text-gray-400">Loading Live SOC Analytics...</p>
      </section>
    );
  }

  return (
    <section id="dashboard" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5 relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-white">Live <span className="text-[#0077ff] neon-text-primary">SOC Analytics</span></h2>
        <p className="text-gray-400">Real-time threat monitoring and risk distribution analysis.</p>
        
        {/* Live Indicator */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs font-medium text-gray-500">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff66]"></span>
          </div>
          Live Data Sync Active {lastUpdated && `(Last updated: ${lastUpdated.toLocaleTimeString()})`}
        </div>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-center">
          <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
          <p>Failed to load threat intelligence data. Retrying...</p>
        </div>
      ) : (
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className={`glass p-6 rounded-xl border border-white/5 hover:${kpi.border} transition-all duration-300 relative overflow-hidden group`}
              >
                <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${kpi.bg} blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="flex justify-between items-start mb-4">
                  <p className="text-gray-400 text-sm font-medium">{kpi.label}</p>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <h3 className="text-3xl font-bold text-white">{kpi.value}</h3>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="glass p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors h-[400px] flex flex-col relative overflow-hidden">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#ff2a2a]" />
                Threat Severity Distribution
              </h3>
              <div className="flex-1 w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={severityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="rgba(0,0,0,0)"
                    >
                      {severityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px' }}/>
                  </PieChart>
                </ResponsiveContainer>
                {/* Inner glow/text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                  <span className="text-3xl font-bold text-white">{threats.length.toLocaleString()}</span>
                  <span className="text-xs text-gray-400">Total</span>
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="glass p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors h-[400px] flex flex-col">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#0077ff]" />
                Top Brand Impersonations
              </h3>
              <div className="flex-1 w-full relative z-10">
                {impersonationData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={impersonationData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} width={80} />
                      <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24} animationDuration={1500}>
                        {impersonationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500 text-sm">
                    No brand impersonation data available
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Threat Table */}
          <div className="glass p-6 rounded-xl border border-white/5 overflow-hidden">
             <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                Live Detected Threats
             </h3>
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[800px]">
                 <thead>
                   <tr className="border-b border-white/10 text-gray-400 text-sm">
                     <th className="pb-3 px-4 font-medium whitespace-nowrap">Timestamp</th>
                     <th className="pb-3 px-4 font-medium whitespace-nowrap">Sender</th>
                     <th className="pb-3 px-4 font-medium whitespace-nowrap">Suspicious URL</th>
                     <th className="pb-3 px-4 font-medium whitespace-nowrap">Severity</th>
                     <th className="pb-3 px-4 font-medium whitespace-nowrap">Score</th>
                     <th className="pb-3 px-4 font-medium text-right whitespace-nowrap">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   {recentThreats.map((threat, idx) => {
                     const rawLevel = getSheetValue(threat, 'threatLevel', 'level');
                     const level = (rawLevel || '').toString().toUpperCase();
                     const rawScore = getSheetValue(threat, 'phishingScore', 'score');
                     const score = parseInt(rawScore) || 0;
                     const sender = getSheetValue(threat, 'senderEmail', 'sender') || "Unknown";
                     const url = getSheetValue(threat, 'suspiciousUrl', 'url') || "N/A";
                     const recommendation = getSheetValue(threat, 'recommendation') || 'Review';
                     const timestamp = getSheetValue(threat, 'timestamp');
                     
                     return (
                       <tr key={idx} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${idx === recentThreats.length - 1 ? 'border-b-0' : ''}`}>
                         <td className="py-4 px-4 text-xs text-gray-500 whitespace-nowrap">
                            {timestamp ? new Date(timestamp).toLocaleString() : 'Just now'}
                         </td>
                         <td className="py-4 px-4 text-sm text-gray-300 whitespace-nowrap">{sender}</td>
                         <td className="py-4 px-4 text-sm text-[#0077ff] truncate max-w-[200px]">{url}</td>
                         <td className="py-4 px-4 text-sm whitespace-nowrap">
                           <span className={`px-2 py-1 rounded text-xs font-medium ${
                             level === 'CRITICAL' ? 'bg-[#ff2a2a]/20 text-[#ff2a2a]' :
                             level === 'HIGH' ? 'bg-[#ff7300]/20 text-[#ff7300]' :
                             'bg-[#00ff66]/20 text-[#00ff66]'
                           }`}>
                             {level || 'UNKNOWN'}
                           </span>
                         </td>
                         <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-black rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-1000 ${score > 85 ? 'bg-[#ff2a2a]' : score > 50 ? 'bg-[#ff7300]' : 'bg-[#00ff66]'}`} 
                                  style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-400">{score}</span>
                            </div>
                         </td>
                         <td className="py-4 px-4 text-right whitespace-nowrap">
                           <button className="text-xs text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors">
                             {recommendation}
                           </button>
                         </td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
               {recentThreats.length === 0 && (
                 <div className="text-center py-10 text-gray-500 text-sm">
                   No recent threats detected.
                 </div>
               )}
             </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
