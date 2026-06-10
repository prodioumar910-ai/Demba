import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  Icon: React.ElementType;
  title: string;
}

export default function OverlayIcon({ isOpen, onClose, Icon, title }: OverlayProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center overflow-hidden"
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X size={32} />
      </button>

      <div className="w-full relative py-20 flex items-center overflow-hidden">
        <motion.div
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center space-x-12 whitespace-nowrap"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <Icon size={120} className="text-gray-900" />
              <span className="mt-4 text-xl font-medium uppercase tracking-widest">{title}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <p className="mt-12 text-sm text-gray-500 uppercase tracking-[0.3em]">
        Défilement en cours...
      </p>
    </motion.div>
  );
}
