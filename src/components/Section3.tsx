import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export default function Section3() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <section className="py-12 sm:py-20 px-6 md:px-12 bg-white flex flex-col items-center font-sans">
      <div className="w-full max-w-[1300px]">
        <motion.div
          onClick={() => navigate('/shop')}
          whileHover={{ scale: 1.005 }}
          className="relative h-[480px] md:h-[580px] w-full overflow-hidden cursor-pointer group shadow-2xl transition-all duration-750 rounded-[1.5rem] border border-gray-200/50 bg-white p-2"
        >
          {/* Main luxury watch engraving background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[2.2rem]">
            <img
              src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1500"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:rotate-1"
              alt="Accéder à la boutique"
              referrerPolicy="no-referrer"
            />
            {/* Elegant overlay depending on theme */}
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-opacity" />
          </div>

          {/* Micro Geometric Lines / Framing for luxury look */}
          <div className="absolute inset-6 rounded-3xl border border-white/5 pointer-events-none z-10 hidden sm:block" />

          {/* Elegant overlay text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
            <h3 className="text-4xl md:text-6xl font-extralight tracking-tight text-white font-serif mb-6 leading-tight max-w-2xl">
              L'écrin secret de <br className="hidden md:block" />
              la haute distinction.
            </h3>
            <div className="h-[1px] w-12 bg-white/30 my-2 group-hover:w-24 transition-all duration-500"></div>
            
            {/* Animated shop entry helper */}
            <div className="mt-6 flex items-center space-x-2 text-[9.5px] uppercase tracking-[0.3em] text-white/80 font-bold bg-white/5 hover:bg-white/10 px-5 py-3 rounded-full border border-white/10 transition-colors backdrop-blur-sm">
              <span>Parcourir le catalogue complet</span>
              <ArrowUpRight size={13} className="text-amber-400" />
            </div>
          </div>

          {/* Bottom detail row */}
          <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 z-20 hidden sm:flex items-center space-x-4">
            <span className="text-[8px] font-mono text-white/50">PARIS • GENÈVE • MONACO</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
