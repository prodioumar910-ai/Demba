import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function Logo({ className }: { className?: string }) {
  const { theme } = useTheme();

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center text-center">
        <span className="text-4xl xs:text-5xl font-extralight tracking-[0.35em] uppercase font-serif text-black">
          Demba
        </span>
        <div className="h-[1px] w-12 my-2 bg-gray-200" />
      </div>
    </motion.div>
  );
}

