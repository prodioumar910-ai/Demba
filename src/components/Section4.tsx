import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { Mail, Phone, Calendar, Check, Send, Sparkles } from 'lucide-react';

// Import local premium seller/expert portrait
import seller1Img from '../assets/images/seller_portrait_1_1780858060198.png';

export default function Section4() {
  const { theme } = useTheme();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [form, setForm] = useState({ name: '', message: '' });

  const sellers = [
    {
      name: 'Adama Diop',
      role: 'Conservateur de Haute Horlogerie',
      quote: 'L\'horlogerie d\'exception n\'est pas une mesure du temps, mais un héritage gravitationnel qui s\'exprime au poignet.',
      photo: seller1Img,
      experience: '12 ans d\'expertise à Genève'
    },
    {
      name: 'Fatou Sow',
      role: 'Directrice Stylistique Optique',
      quote: 'Le regard est une architecture. Habiller un visage d\'or optique relève d\'une pure sculpture lumineuse.',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
      experience: 'Ancienne Styliste Lunetière à Milan'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setForm({ name: '', message: '' });
      setIsContactOpen(false);
    }, 2500);
  };

  return (
    <section className="py-24 px-6 md:px-12 border-b bg-white border-gray-100 text-black flex flex-col items-center font-sans">
      <div className="w-full max-w-[1300px]">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl font-extralight tracking-tight font-serif text-gray-900">
            L'Atelier des Experts & Artisans
          </h2>
          <div className="h-[1px] w-12 mx-auto my-4 bg-gray-200" />
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          {sellers.map((seller, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-[2.2rem] border transition-all duration-500 bg-white border-gray-100 hover:border-gray-900/30"
            >
              {/* Photo Wrapper */}
              <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden transition-all duration-750 bg-gray-100 border-2 border-gray-100 shadow-md">
                <img 
                  src={seller.photo} 
                  alt={seller.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>

              {/* Specialist Info */}
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[8px] font-mono tracking-widest px-2 py-0.5 rounded bg-gray-100 text-gray-800 font-semibold">
                  {seller.experience}
                </span>
                <h3 className="text-md font-semibold font-serif mt-2 text-[#1C1C1D]">
                  {seller.name}
                </h3>
                <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500">
                  {seller.role}
                </p>
                <p className="text-[11px] leading-relaxed italic mt-3 text-gray-750">
                  “ {seller.quote} ”
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Activation Drawer/Panel Trigger */}
        <div className="flex flex-col items-center mt-16 space-y-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsContactOpen(!isContactOpen)}
            className="px-10 py-4 text-[10px] uppercase font-semibold tracking-[0.3em] rounded-full transition-all duration-300 bg-black text-white hover:bg-neutral-850 shadow-md"
          >
            {isContactOpen ? 'Fermer la Prise de Rendez-vous' : 'Prendre Rendez-vous en Salon'}
          </motion.button>

          {/* Inline luxury Form */}
          <AnimatePresence>
            {isContactOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full max-w-xl overflow-hidden mt-6"
              >
                <form
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-8 rounded-3xl border text-left space-y-4 bg-white border-gray-200"
                >
                  <h4 className="text-xs uppercase tracking-widest font-bold flex items-center space-x-2">
                    <Calendar size={14} className="text-gray-950" />
                    <span>ENTRETIEN PRIVÉ</span>
                  </h4>
                  <p className="text-[10px] leading-relaxed text-gray-500">
                    Prenez rendez-vous avec l'un de nos experts pour des essayages à Paris, Monaco ou en visioconférence. Notre concierge privé s'ajustera sous 1 heure.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      required
                      type="text"
                      className="px-4 py-3 text-xs rounded-xl outline-none transition-all bg-gray-50 border border-gray-200 text-gray-900 focus:ring-1 focus:ring-gray-900"
                      placeholder="Votre nom"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                      required
                      type="text"
                      className="px-4 py-3 text-xs rounded-xl outline-none transition-all bg-gray-50 border border-gray-200 text-gray-900 focus:ring-1 focus:ring-gray-900"
                      placeholder="Sujet de consultation"
                    />
                  </div>

                  <textarea
                    required
                    rows={3}
                    className="w-full px-4 py-3 text-xs rounded-xl outline-none transition-all bg-gray-50 border border-gray-200 text-gray-900 focus:ring-1 focus:ring-gray-900"
                    placeholder="Quelles sont vos pièces de prédilection ou vos créations préférées ?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />

                  <button
                    type="submit"
                    disabled={isSent}
                    className={`w-full py-3 rounded-xl text-[9.5px] font-bold uppercase tracking-[0.25em] flex items-center justify-center space-x-2 transition-all ${
                      isSent
                        ? 'bg-emerald-500 text-white'
                        : 'bg-black text-white hover:bg-neutral-850'
                    }`}
                  >
                    {isSent ? (
                      <>
                        <Check size={14} strokeWidth={2.5} />
                        <span>CONSULTATION PLANIFIÉE AVEC SUCCÈS</span>
                      </>
                    ) : (
                      <>
                        <Send size={12} />
                        <span>ENVOYER LA DEMANDE</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
