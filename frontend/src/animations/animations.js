// utils/animations.js
// Reusable Framer Motion variants for smooth cyber animations

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const fadeRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const pulseGlow = {
  hidden: { opacity: 0.8, scale: 0.98 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      repeat: Infinity, 
      repeatType: 'reverse', 
      duration: 1.5 
    } 
  }
};
