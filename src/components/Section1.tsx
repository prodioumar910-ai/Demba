import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ChevronRight, ArrowDown } from 'lucide-react';
import Logo from './Logo';

const images = [
  'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=1200', // Luxury gold watch macro
  'https://images.unsplash.com/photo-1511499767390-a7335b719487?auto=format&fit=crop&q=80&w=1200', // Luxury gold/champagne glasses close up
  'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1200', // Luxury crystal glass perfume
];

export default function Section1() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.94]);
  const y = useTransform(scrollY, [0, 600], [0, 100]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section 
      style={{ opacity, scale, y }}
      className="relative h-screen min-h-[650px] w-full overflow-hidden flex flex-col items-center justify-between pb-12 transition-all duration-700 bg-white text-black"
    >
      {/* Dynamic Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.4]" />

      {/* Top Bar Logo */}
      <div className="pt-10 z-20 w-fit">
        <Logo />
      </div>

      {/* Central Immersive Media Presentation */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-4 sm:p-12 md:p-16">
        <div className="relative w-full h-[75%] max-w-[1300px] overflow-hidden transition-all duration-700 rounded-[1.5rem] border border-gray-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white p-2">
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[2.2rem]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Dynamic Theme Atmosphere Overlay */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />

          {/* Fine typographic overlay detail inside card */}
          <div className="absolute bottom-10 left-8 sm:left-12 z-10 max-w-[85%] sm:max-w-xl text-left pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={currentIndex}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-3xl sm:text-5xl font-extralight tracking-tight font-serif mb-4 leading-none text-white drop-shadow-md">
                {currentIndex === 0 && 'Le temps suspendu, sculpté en or.'}
                {currentIndex === 1 && 'Précision géométrique, pure clarté.'}
                {currentIndex === 2 && 'Une empreinte intemporelle d\'exception.'}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Control Dot Carousel & CTA */}
      <div className="z-10 w-full max-w-[1300px] px-8 sm:px-16 flex flex-col sm:flex-row items-center justify-between gap-6 font-sans">
        {/* Navigation Dot indicators */}
        <div className="flex items-center space-x-3 bg-gray-50 backdrop-blur-md px-4 py-2.5 rounded-full border border-gray-200">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? 'w-6 bg-black'
                  : 'w-1.5 bg-gray-300 hover:bg-gray-405'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/shop')}
            className="px-8 py-3.5 rounded-full text-[10.5px] font-bold uppercase tracking-[0.3em] flex items-center space-x-2 transition-all bg-black text-white hover:bg-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
          >
            <span>Explorer la collection</span>
            <ChevronRight size={14} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>

      {/* Bounce scroll down prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity duration-300 font-sans">
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={12} className="text-black" />
        </motion.div>
      </div>
    </motion.section>
  );
}
