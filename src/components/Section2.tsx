import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, ArrowRight } from 'lucide-react';

// Import local bespoke high-quality 3D luxury renders
import watchImg from '../assets/images/luxury_watch_1_1780858019019.png';
import glassesImg from '../assets/images/luxury_glasses_1_1780858032020.png';
import perfumeImg from '../assets/images/luxury_perfume_1_1780858046555.png';

const categories = [
  {
    id: 'watch',
    title: 'Haute Horlogerie',
    subtitle: 'La rigueur mécanique façonnée d\'or noir',
    image: watchImg,
    tag: 'SÉLECTION PREMIUM'
  },
  {
    id: 'glasses',
    title: 'Optique Divine',
    subtitle: 'Dessins d\'arêtes en titane pur',
    image: glassesImg,
    tag: 'DESIGN ÉPURÉ'
  },
  {
    id: 'perfume',
    title: 'Parfums Rares',
    subtitle: 'Essence souveraine issue d\'alchimie rare',
    image: perfumeImg,
    tag: 'ESSENCE UNIQUE'
  },
];

export default function Section2() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <section className="py-28 px-6 sm:px-12 md:px-16 bg-white border-b border-gray-100">
      <div className="max-w-[1300px] mx-auto font-sans">
        {/* Editorial Title Header */}
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-16 gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extralight tracking-tight font-serif text-gray-900">
              Nos Univers Singuliers
            </h2>
          </div>
        </div>

        {/* Dynamic Categories Grid */}
        <div className="flex flex-row overflow-x-auto md:grid md:grid-cols-3 gap-4 sm:gap-8 md:gap-10 pb-4 scrollbar-none snap-x snap-mandatory">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              onClick={() => navigate(`/shop?category=${cat.id}`)}
              className="group cursor-pointer flex flex-col relative justify-between font-sans shrink-0 w-[280px] sm:w-[340px] md:w-auto snap-center"
            >
              {/* Card framing wrapper */}
              <div className="relative aspect-[3/4.5] w-full overflow-hidden p-6 flex flex-col justify-between transition-all duration-700 bg-[#121115] border border-neutral-800/45 rounded-2xl hover:border-neutral-500/40 hover:scale-[1.01] shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                {/* Visual Label Tag in card header */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[8px] font-mono tracking-widest font-bold px-2.5 py-1 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800/60">
                    {cat.tag}
                  </span>
                  <div className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white text-black">
                    <ArrowRight size={12} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Main Rendered Image floating in the center */}
                <div className="relative h-[55%] w-full flex items-center justify-center my-4 overflow-visible">
                  <div className="absolute w-32 h-32 rounded-full blur-[40px] opacity-20 scale-75 transition-all group-hover:scale-100 bg-amber-500/10" />
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-[85%] object-contain drop-shadow-[0_15px_22px_rgba(0,0,0,0.12)] transition-all duration-750 ease-out group-hover:scale-105 group-hover:-translate-y-2"
                  />
                </div>

                {/* Details Footer inside card */}
                <div className="z-10 text-center sm:text-left mt-auto">
                  <h4 className="text-lg font-light tracking-wide font-serif mb-1 text-white group-hover:text-neutral-300">
                    {cat.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
