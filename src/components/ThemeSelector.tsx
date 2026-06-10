import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { Sliders, Sun, Moon, Grid, Tv, AlignLeft, Sparkles, Check, RefreshCw } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function ThemeSelector() {
  const { theme, setTheme, displayStyle, setDisplayStyle } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isShopPage = location.pathname.includes('/shop');

  // Custom click sound effect using standard high-end browser frequencies
  const playTick = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(2200, audioCtx.currentTime); // High pitched clean click
      gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.05);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      // AudioContext is restricted before user gesture, ignore fail
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`w-[320px] p-6 mb-4 rounded-3xl border shadow-[0_24px_60px_rgba(0,0,0,0.15)] backdrop-blur-2xl transition-colors duration-500 font-sans ${
              theme === 'obsidian'
                ? 'bg-[#0B0A0C]/95 border-amber-500/15 text-white'
                : theme === 'emerald'
                  ? 'bg-[#032014]/96 border-emerald-500/20 text-white'
                  : 'bg-white/95 border-gray-100 text-gray-900'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-4 transition-colors duration-500 lg:mb-5 border-neutral-500/10">
              <div className="flex items-center space-x-2">
                <Sparkles size={16} className={theme === 'obsidian' ? 'text-amber-400' : theme === 'emerald' ? 'text-emerald-400' : 'text-gray-900'} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] font-display">
                  Atelier de Style
                </span>
              </div>
              <motion.button
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  playTick();
                  setTheme('obsidian');
                  setDisplayStyle('bento');
                }}
                className={`p-1.5 rounded-full transition-colors ${
                  theme === 'obsidian' ? 'hover:bg-amber-400/10 text-amber-100/45 hover:text-amber-300' : theme === 'emerald' ? 'hover:bg-emerald-400/10 text-emerald-100/45 hover:text-emerald-350' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-900'
                }`}
                title="Décliner aux valeurs originelles"
              >
                <RefreshCw size={12} />
              </motion.button>
            </div>

            {/* Part 1: Color Themes */}
            <div className="mb-6">
              <span className={`text-[9px] uppercase tracking-widest block mb-3 font-semibold ${
                theme === 'obsidian' ? 'text-neutral-400' : theme === 'emerald' ? 'text-emerald-300/60' : 'text-gray-400'
              }`}>
                Thème d'Ambiance
              </span>
              <div className="flex flex-col space-y-2">
                {/* Obsidian Dark */}
                <button
                  onClick={() => {
                    playTick();
                    setTheme('obsidian');
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-[11px] font-medium tracking-wide transition-all ${
                    theme === 'obsidian'
                      ? 'border-amber-400 bg-amber-500/5 text-amber-200'
                      : theme === 'emerald'
                        ? 'border-white/5 bg-transparent text-neutral-400 hover:border-white/10'
                        : 'border-gray-200 bg-transparent text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <Moon size={14} className="text-amber-400" />
                    <span>Obsidian Gold</span>
                  </span>
                  {theme === 'obsidian' && <Check size={12} className="text-amber-400" />}
                </button>

                {/* Ivory Light */}
                <button
                  onClick={() => {
                    playTick();
                    setTheme('ivory');
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-[11px] font-medium tracking-wide transition-all ${
                    theme === 'ivory'
                      ? 'border-gray-900 bg-gray-50 text-gray-900'
                      : theme === 'obsidian' || theme === 'emerald'
                        ? 'border-white/10 bg-transparent text-white/40 hover:border-white/20'
                        : 'border-gray-200 bg-transparent text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <Sun size={14} className="text-amber-600 dark:text-amber-300" />
                    <span>Ivoire Minimal</span>
                  </span>
                  {theme === 'ivory' && <Check size={12} className="text-gray-900" />}
                </button>

                {/* Emerald Royale */}
                <button
                  onClick={() => {
                    playTick();
                    setTheme('emerald');
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-[11px] font-medium tracking-wide transition-all ${
                    theme === 'emerald'
                      ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300'
                      : theme === 'obsidian'
                        ? 'border-white/5 bg-transparent text-neutral-400 hover:border-white/10'
                        : 'border-gray-200 bg-transparent text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <Sparkles size={14} className="text-emerald-400" />
                    <span>Émeraude Royale</span>
                  </span>
                  {theme === 'emerald' && <Check size={12} className="text-emerald-400" />}
                </button>
              </div>
            </div>

            {/* Part 2: Layout Style */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[9px] uppercase tracking-widest font-semibold ${
                  theme === 'obsidian' ? 'text-neutral-400' : theme === 'emerald' ? 'text-emerald-300/60' : 'text-gray-400'
                }`}>
                  Style de Présentation
                </span>
                {!isShopPage && (
                  <span className={`text-[8px] font-mono scale-90 px-1.5 py-0.5 rounded ${
                    theme === 'obsidian' ? 'bg-amber-500/10 text-amber-300' : theme === 'emerald' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    SHOP ONLY
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                {[
                  { id: 'bento', label: 'Bento Luxe', icon: Grid, desc: 'Structure asymétrique contemporaine' },
                  { id: 'immersive', label: 'Galerie Immersive', icon: Tv, desc: 'Zoom grand écran avec focus sensoriel' },
                  { id: 'studio', label: 'Studio Épuré', icon: AlignLeft, desc: 'Table minimaliste et popups d’images' }
                ].map((style) => {
                  const IconComponent = style.icon;
                  const isActive = displayStyle === style.id;
                  const isSelectedAndLive = isActive && isShopPage;

                  return (
                    <button
                      key={style.id}
                      disabled={!isShopPage}
                      onClick={() => {
                        playTick();
                        if (isShopPage) setDisplayStyle(style.id as any);
                      }}
                      className={`flex items-start text-left p-3 rounded-xl border transition-all ${
                        !isShopPage
                          ? 'opacity-40 cursor-not-allowed border-transparent'
                          : isSelectedAndLive
                            ? theme === 'obsidian'
                              ? 'border-amber-400/40 bg-amber-500/5 text-white'
                              : theme === 'emerald'
                                ? 'border-emerald-400/40 bg-emerald-500/5 text-white'
                                : 'border-gray-900 bg-gray-50 text-gray-950'
                            : theme === 'obsidian' || theme === 'emerald'
                              ? 'border-white/5 bg-white/2 hover:bg-white/5 text-neutral-400'
                              : 'border-gray-100 bg-transparent text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <div className="p-1 rounded bg-black/5 dark:bg-white/5 mr-3 mt-0.5">
                        <IconComponent size={14} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] font-semibold tracking-wide flex items-center justify-between">
                          <span>{style.label}</span>
                          {isSelectedAndLive && (
                            <span className={`text-[7px] uppercase tracking-widest px-1.5 py-0.5 rounded font-bold ${
                              theme === 'obsidian' ? 'bg-amber-400 text-black' : theme === 'emerald' ? 'bg-emerald-400 text-black' : 'bg-gray-900 text-white'
                            }`}>
                              Actif
                            </span>
                          )}
                        </div>
                        <p className="text-[9px] text-gray-500 mt-1 line-clamp-1">{style.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {!isShopPage && (
                <p className={`text-[9px] leading-relaxed text-center mt-3 ${
                  theme === 'obsidian' ? 'text-amber-400/70' : theme === 'emerald' ? 'text-emerald-300/70' : 'text-gray-500'
                }`}>
                  Rendez-vous dans la <strong>Boutique</strong> pour vivre la transformation des 3 styles d'affichage !
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        id="theme-selector-toggle"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playTick();
          setIsOpen(!isOpen);
        }}
        className={`flex items-center justify-center p-4 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all ${
          isOpen
            ? theme === 'obsidian'
              ? 'bg-amber-400 text-black ring-4 ring-amber-400/25'
              : theme === 'emerald'
                ? 'bg-emerald-400 text-black ring-4 ring-emerald-400/25'
                : 'bg-gray-950 text-white ring-4 ring-gray-950/25'
            : theme === 'obsidian'
              ? 'bg-[#18171B] border border-amber-500/20 text-amber-400 hover:border-amber-400/40'
              : theme === 'emerald'
                ? 'bg-[#031d12] border border-emerald-500/20 text-emerald-450 hover:border-emerald-400/40'
                : 'bg-gray-900 text-white hover:bg-black'
        }`}
      >
        <Sliders size={20} className={isOpen ? 'rotate-90 transition-transform duration-300' : ''} />
      </motion.button>
    </div>
  );
}
