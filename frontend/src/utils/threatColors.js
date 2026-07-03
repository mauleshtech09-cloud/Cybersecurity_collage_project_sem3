// utils/threatColors.js
// Utility to determine dynamic UI colors based on threat level

export const getThreatColors = (threatLevel) => {
  switch (threatLevel?.toUpperCase()) {
    case 'SAFE':
    case 'LOW':
      return {
        text: 'text-primary',
        border: 'border-primary',
        bg: 'bg-primary/20',
        glow: 'glow-primary',
        icon: 'text-primary'
      };
    case 'SUSPICIOUS':
    case 'MEDIUM':
      return {
        text: 'text-yellow-400',
        border: 'border-yellow-400',
        bg: 'bg-yellow-400/20',
        glow: 'shadow-[0_0_15px_rgba(250,204,21,0.5)]',
        icon: 'text-yellow-400'
      };
    case 'DANGEROUS':
    case 'HIGH':
      return {
        text: 'text-accent',
        border: 'border-accent',
        bg: 'bg-accent/20',
        glow: 'glow-accent',
        icon: 'text-accent'
      };
    default:
      return {
        text: 'text-gray-400',
        border: 'border-gray-600',
        bg: 'bg-gray-800',
        glow: '',
        icon: 'text-gray-400'
      };
  }
};
