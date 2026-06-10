import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter, Mail, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Section5() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="py-16 px-8 sm:px-12 md:px-16 transition-colors duration-700 ease-in-out border-t flex flex-col md:flex-row items-center justify-between gap-10 bg-white border-gray-200 text-gray-900">
      {/* Brand & Social Column */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 font-sans">
        <span className="text-xl font-light tracking-[0.25em] uppercase font-serif text-black">
          DEMBA PARIS
        </span>
        <p className="text-[10px] uppercase tracking-widest text-neutral-500 max-w-[240px] leading-relaxed">
          Sartorialiste de l'élite temporelle et de l'éclat de vision exclusif.
        </p>
        
        {/* Social connections */}
        <div className="flex space-x-5 pt-2">
          {[Instagram, Facebook, Twitter].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.15, y: -2 }}
              className="transition-colors duration-300 text-gray-500 hover:text-black"
            >
              <Icon size={16} strokeWidth={1.5} />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Newsletter signup - La Lettre */}
      <div className="w-full max-w-sm flex flex-col items-center md:items-start space-y-3 font-sans">
        <form onSubmit={handleSubscribe} className="flex w-full relative">
          <input
            required
            type="email"
            placeholder="votre.email@luxury.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubscribed}
            className="w-full px-4 py-3 text-[10.5px] rounded-xl focus:ring-1 focus:ring-black outline-none transition-all pr-12 bg-white border border-gray-300 text-gray-950"
          />
          <button
            type="submit"
            disabled={isSubscribed}
            className={`absolute right-1 top-1 bottom-1 px-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
              isSubscribed
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-950 text-white hover:bg-black'
            }`}
          >
            {isSubscribed ? <Check size={12} strokeWidth={3} /> : <Mail size={12} />}
          </button>
        </form>
        <p className="text-[8px] text-neutral-500 tracking-wider">
          En vous abonnant, vous acceptez de recevoir nos invitations exclusives.
        </p>
      </div>

      {/* Navigation and EST */}
      <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4 font-sans">
        <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
          {['La Maison', 'Collections', 'Prise de RDV', 'Avis'].map((item, i) => (
            <button
              onClick={() => navigate('/shop')}
              key={i}
              className="text-[10px] uppercase font-bold tracking-widest transition-colors text-neutral-500 hover:text-gray-900"
            >
              {item}
            </button>
          ))}
        </div>
        
        <div className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase flex items-center space-x-2">
          <span>PARIS • GENÈVE</span>
          <span>—</span>
          <span>EST. 2024</span>
        </div>
      </div>
    </footer>
  );
}
