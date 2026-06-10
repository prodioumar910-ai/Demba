import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme, CartItem } from '../context/ThemeContext';
import { X, Trash2, Shield, Truck, Sparkles, Check, ChevronRight } from 'lucide-react';

export default function CartDrawer() {
  const { theme, cart, isCartOpen, setIsCartOpen, removeFromCart, updateCartQuantity, clearCart } = useTheme();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  const [shippingInfo, setShippingInfo] = useState({ name: '', email: '', city: 'Paris' });

  // Custom packaging prices
  const getPackagingPrice = (type: string) => {
    if (type === 'velour') return 15;
    if (type === 'cuir') return 45;
    return 0;
  };

  const getPackagingName = (type: string) => {
    if (type === 'velour') return 'Coffret en Velours Auguste (+15 €)';
    if (type === 'cuir') return 'Malle Cuir & Dorure (+45 €)';
    return 'Étui Protecteur Signature (Gratuit)';
  };

  // Calculations
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const basePrice = item.product.price * item.quantity;
      const packPrice = getPackagingPrice(item.packaging) * item.quantity;
      return total + basePrice + packPrice;
    }, 0);
  };

  const getShippingCost = (subtotal: number) => {
    if (subtotal > 1500) return 0; // Free private courier above 1500€
    return 25;
  };

  const subtotal = calculateSubtotal();
  const shipping = getShippingCost(subtotal);
  const total = subtotal + shipping;

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingInfo.name || !shippingInfo.email) return;
    setCheckoutStep('success');
  };

  const handleOrderClose = () => {
    clearCart();
    setCheckoutStep('cart');
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop screen filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black backdrop-blur-sm"
          />

          {/* Sidedrawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[500px] flex flex-col justify-between font-sans overflow-hidden shadow-[-10px_0_40px_rgba(0,0,0,0.3)] transition-colors duration-500 ${
              theme === 'obsidian'
                ? 'bg-[#0B0A0C] text-white border-l border-amber-500/10'
                : theme === 'emerald'
                  ? 'bg-[#032014] text-white border-l border-emerald-500/10'
                  : 'bg-[#FCFAF6] text-gray-900 border-l border-gray-100'
            }`}
          >
            {/* Header */}
            <div className={`p-6 flex items-center justify-between border-b transition-colors duration-500 ${
              theme === 'obsidian' ? 'border-amber-400/10' : theme === 'emerald' ? 'border-emerald-500/15' : 'border-gray-200/50'
            }`}>
              <div className="flex items-center space-x-3">
                <Sparkles size={18} className={theme === 'obsidian' ? 'text-amber-400' : theme === 'emerald' ? 'text-emerald-400' : 'text-gray-900'} />
                <h2 className="text-sm font-semibold uppercase tracking-[0.25em] font-display">
                  {checkoutStep === 'cart' ? 'Votre Écrin de Commande' : checkoutStep === 'shipping' ? 'Adresse de Livraison Privée' : 'Commande Reçue'}
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className={`p-2 rounded-full transition-all ${
                  theme === 'obsidian' || theme === 'emerald' ? 'hover:bg-white/10 text-neutral-400 hover:text-white' : 'hover:bg-black/5 text-gray-400 hover:text-gray-900'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Container based on step */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              {checkoutStep === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      <div className={`p-6 rounded-full ${
                        theme === 'obsidian' ? 'bg-amber-400/5 text-amber-300' : theme === 'emerald' ? 'bg-emerald-450/5 text-emerald-300' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Sparkles size={36} strokeWidth={1} />
                      </div>
                      <p className="text-xs uppercase tracking-widest text-neutral-400">
                        Votre écrin est actuellement vide.
                      </p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className={`text-xs uppercase font-bold tracking-widest underline ${
                          theme === 'obsidian' ? 'text-amber-300' : theme === 'emerald' ? 'text-emerald-300' : 'text-gray-900'
                        }`}
                      >
                        Continuer les découvertes
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cart.map((item, index) => (
                        <motion.div
                          key={`${item.product.id}-${item.packaging}-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex items-start pb-6 border-b outline-none last:border-0 ${
                            theme === 'obsidian' ? 'border-neutral-500/10' : theme === 'emerald' ? 'border-emerald-500/10' : 'border-gray-200/40'
                          }`}
                        >
                          {/* Image */}
                          <div className={`w-20 aspect-[4/5] overflow-hidden bg-neutral-900 border mr-4 shrink-0 transition-colors ${
                            theme === 'obsidian' ? 'border-amber-400/10' : theme === 'emerald' ? 'border-emerald-500/15' : 'border-gray-200'
                          }`}>
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <span className={`text-[9px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded ${
                              theme === 'obsidian' ? 'bg-amber-400/10 text-amber-300' : theme === 'emerald' ? 'bg-emerald-400/10 text-emerald-300' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.product.category === 'watch' ? 'Horlogerie' : item.product.category === 'glasses' ? 'Optique' : 'Parfums'}
                            </span>
                            <h3 className="text-xs font-semibold uppercase tracking-widest mt-1.5 truncate">
                              {item.product.name}
                            </h3>
                            <p className="text-[10px] text-gray-500 mt-0.5">
                              {getPackagingName(item.packaging)}
                            </p>

                            <div className="flex items-center space-y-0.5 justify-between mt-3">
                              {/* Quantity selection */}
                              <div className={`flex items-center space-x-1.5 rounded-full px-2 py-1 ${
                                theme === 'obsidian' || theme === 'emerald' ? 'bg-white/5 border border-white/5' : 'bg-gray-100'
                              }`}>
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                  className="text-[10px] px-1 hover:text-amber-400 transition-colors font-bold"
                                >
                                  -
                                </button>
                                <span className="text-[10px] font-mono font-medium px-1 leading-none">{item.quantity}</span>
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                  className="text-[10px] px-1 hover:text-amber-400 transition-colors font-bold"
                                >
                                  +
                                </button>
                              </div>

                              {/* Price */}
                              <span className="text-[11px] font-mono font-medium">
                                {((item.product.price + getPackagingPrice(item.packaging)) * item.quantity).toLocaleString()} €
                              </span>
                            </div>
                          </div>

                          {/* Delete Item */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className={`p-1 ml-2 transition-colors ${
                              theme === 'obsidian' || theme === 'emerald' ? 'hover:text-red-400 text-neutral-500' : 'hover:text-red-500 text-gray-400'
                            }`}
                          >
                            <Trash2 size={13} strokeWidth={1.5} />
                          </button>
                        </motion.div>
                      ))}

                      {/* Micro assurance */}
                      <div className={`p-4 rounded-2xl flex items-start space-x-3 text-[10px] ${
                        theme === 'obsidian' || theme === 'emerald' ? 'bg-white/2 text-neutral-400' : 'bg-gray-50 text-gray-500'
                      }`}>
                        <Shield size={14} className="shrink-0 mt-0.5 text-emerald-400" />
                        <div>
                          <p className="font-semibold text-black dark:text-neutral-200">Garantie & Service Premium d'Origine</p>
                          <p className="mt-0.5">Chaque pièce est fournie avec son certificat d'authenticité, son étui officiel d'origine et une garantie manufacture de 3 ans.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 'shipping' && (
                <form id="shipping-form" onSubmit={handleCreateOrder} className="space-y-6">
                  <h3 className="text-xs uppercase tracking-widest font-semibold">Conseil de Livraison à Domicile</h3>
                  <p className={`text-[11px] leading-relaxed ${theme === 'obsidian' ? 'text-neutral-400' : theme === 'emerald' ? 'text-[#E6DCC4]/80' : 'text-gray-500'}`}>
                    Notre service de livraison vous livre en main propre. Veuillez renseigner vos coordonnées d'expédition exclusives. Free Courier Privé inclus au-dessus de 1 500 €.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest font-semibold mb-1.5">Nom Complet</label>
                      <input
                        required
                        type="text"
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl text-xs font-medium outline-none transition-all ${
                          theme === 'obsidian'
                            ? 'bg-white/5 border border-white/10 text-white focus:ring-1 focus:ring-amber-400/50'
                            : theme === 'emerald'
                              ? 'bg-black/20 border border-emerald-500/15 text-white focus:ring-1 focus:ring-emerald-400/50'
                              : 'bg-white border text-gray-900 border-gray-200 focus:ring-1 focus:ring-gray-900'
                        }`}
                        placeholder="Ex: Alexandre de Beauharnais"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-widest font-semibold mb-1.5">Adresse de messagerie</label>
                      <input
                        required
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl text-xs font-medium outline-none transition-all ${
                          theme === 'obsidian'
                            ? 'bg-white/5 border border-white/10 text-white focus:ring-1 focus:ring-amber-400/50'
                            : theme === 'emerald'
                              ? 'bg-black/20 border border-emerald-500/15 text-white focus:ring-1 focus:ring-emerald-400/50'
                              : 'bg-white border text-gray-900 border-gray-200 focus:ring-1 focus:ring-gray-900'
                        }`}
                        placeholder="Ex: alexandre@luxury.fr"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-widest font-semibold mb-1.5 font-display">Ville de livraison</label>
                      <select
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl text-xs font-medium outline-none transition-all ${
                          theme === 'obsidian'
                            ? 'bg-white/5 border border-white/10 text-white focus:ring-1 focus:ring-amber-400/50'
                            : theme === 'emerald'
                              ? 'transparent border border-emerald-500/15 text-white focus:ring-1 focus:ring-emerald-400/50 [&_option]:text-black'
                              : 'bg-white border text-gray-900 border-gray-200 focus:ring-1 focus:ring-gray-900'
                        }`}
                      >
                        <option value="Paris">Paris (France) - Bureau d'Atelier</option>
                        <option value="Genève">Genève (Suisse) - Haute Manufacture</option>
                        <option value="Monaco">Monaco (Principauté)</option>
                        <option value="London">Londres (Royaume-Uni)</option>
                        <option value="Dakar">Dakar (Sénégal) - Boutique Associée</option>
                      </select>
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl flex items-center space-x-3 text-[10px] ${
                    theme === 'obsidian' || theme === 'emerald' ? 'bg-white/2 text-neutral-400' : 'bg-gray-50 text-gray-500'
                  }`}>
                    <Truck size={14} className={theme === 'obsidian' ? 'text-amber-400' : 'text-emerald-400'} />
                    <span>L'expédition s'effectue sous 24h avec cachet de cire protecteur.</span>
                  </div>
                </form>
              )}

              {checkoutStep === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  {/* Luxury Stamp icon */}
                  <motion.div
                    initial={{ scale: 0.5, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center bg-transparent border-2 border-dashed text-amber-400 p-2 ${
                      theme === 'emerald' ? 'border-emerald-400/50 text-emerald-400' : 'border-amber-400/50 text-amber-400'
                    }`}
                  >
                    <div className={`absolute inset-1 rounded-full border flex items-center justify-center ${
                      theme === 'emerald' ? 'bg-emerald-450/10 border-emerald-400' : 'bg-amber-400/10 border-amber-400'
                    }`}>
                      <Check size={28} strokeWidth={2.5} />
                    </div>
                  </motion.div>

                  <div className="space-y-2">
                    <span className={`text-[9px] uppercase tracking-[0.3em] font-mono ${
                      theme === 'emerald' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      PAIEMENT ACCEPTÉ AVEC SUCCÈS
                    </span>
                    <h3 className="text-xl font-light uppercase tracking-widest font-serif">
                      Merci pour votre confiance, {shippingInfo.name}
                    </h3>
                  </div>

                  {/* Receipt design */}
                  <div className={`w-full p-5 rounded-2xl text-left font-mono text-[9px] space-y-2 border relative overflow-hidden ${
                    theme === 'obsidian'
                      ? 'bg-neutral-900/50 border-white/5 text-neutral-300'
                      : theme === 'emerald'
                        ? 'bg-black/20 border-emerald-500/10 text-neutral-100'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}>
                    <div className={`absolute top-0 right-0 w-24 h-24 blur-xl rounded-full ${
                      theme === 'emerald' ? 'bg-emerald-400/5' : 'bg-amber-400/5'
                    }`} />
                    <div className="flex justify-between border-b border-dashed pb-2">
                      <span>RÉF. COMMANDE:</span>
                      <span className="font-bold">#DM-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DESTINATAIRE:</span>
                      <span className="uppercase">{shippingInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>EMAIL:</span>
                      <span>{shippingInfo.email}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>DESTINATION:</span>
                      <span className="uppercase">{shippingInfo.city}</span>
                    </div>
                    <div className="space-y-1 my-2">
                      {cart.map(item => (
                        <div key={item.product.id} className="flex justify-between text-neutral-400">
                          <span className="truncate max-w-[200px]">{item.quantity}x {item.product.name}</span>
                          <span>{((item.product.price + getPackagingPrice(item.packaging)) * item.quantity).toLocaleString()} €</span>
                        </div>
                      ))}
                    </div>
                    <div className={`flex justify-between border-t border-dashed pt-2 text-[10px] font-bold ${
                      theme === 'emerald' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      <span>TOTAL PAYÉ:</span>
                      <span>{total.toLocaleString()} €</span>
                    </div>
                  </div>

                  <p className={`text-[10px] leading-relaxed max-w-[320px] ${theme === 'obsidian' ? 'text-neutral-400' : theme === 'emerald' ? 'text-[#E6DCC4]/80' : 'text-gray-500'}`}>
                    Un coursier de notre maison vous contactera d'ici quelques heures pour planifier la livraison à <strong>{shippingInfo.city}</strong>.
                  </p>

                  <button
                    onClick={handleOrderClose}
                    className={`w-full py-4 text-[10px] font-bold uppercase tracking-widest text-center transition-all ${
                      theme === 'obsidian'
                        ? 'bg-amber-400 text-black hover:bg-amber-300'
                        : theme === 'emerald'
                          ? 'bg-emerald-400 text-black hover:bg-[#10B981]'
                          : 'bg-gray-950 text-white hover:bg-black'
                    }`}
                  >
                    Fermer & Retourner à la Boutique
                  </button>
                </div>
              )}
            </div>

            {/* Footer containing totals */}
            {cart.length > 0 && checkoutStep !== 'success' && (
              <div className={`p-6 border-t space-y-4 transition-colors duration-500 ${
                theme === 'obsidian'
                  ? 'border-amber-400/10 bg-neutral-950/40'
                  : theme === 'emerald'
                    ? 'border-emerald-500/10 bg-[#02170d]/60'
                    : 'border-gray-200/50 bg-[#F5F2EC]/30'
              }`}>
                <div className="space-y-2 text-xs font-medium">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sous-total :</span>
                    <span className="font-mono">{subtotal.toLocaleString()} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Livraison (Chauffeur privé) :</span>
                    <span className="font-mono">
                      {shipping === 0 ? 'Offerte (Gratuit)' : `${shipping} €`}
                    </span>
                  </div>
                  <div className="h-[1px] w-full bg-neutral-500/10 my-2"></div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] uppercase tracking-widest font-bold">Total d'Exception :</span>
                    <span className={`text-lg font-serif font-semibold ${
                      theme === 'obsidian' ? 'text-amber-400' : theme === 'emerald' ? 'text-emerald-400 font-semibold' : 'text-gray-950 font-semibold'
                    }`}>
                      {total.toLocaleString()} €
                    </span>
                  </div>
                </div>

                {checkoutStep === 'cart' ? (
                  <button
                    onClick={() => setCheckoutStep('shipping')}
                    className={`w-full py-4 rounded-xl flex items-center justify-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                      theme === 'obsidian'
                        ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-[0_4px_20px_rgba(245,158,11,0.15)]'
                        : theme === 'emerald'
                          ? 'bg-emerald-400 text-black hover:bg-emerald-300 shadow-[0_4px_20px_rgba(16,185,129,0.15)]'
                          : 'bg-gray-950 text-white hover:bg-black shadow-lg'
                    }`}
                  >
                    <span>Passer à la livraison</span>
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="shipping-form"
                    className={`w-full py-4 rounded-xl flex items-center justify-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                      theme === 'obsidian'
                        ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-[0_4px_20px_rgba(245,158,11,0.15)]'
                        : theme === 'emerald'
                          ? 'bg-emerald-400 text-black hover:bg-emerald-300 shadow-[0_4px_20px_rgba(16,185,129,0.15)]'
                          : 'bg-gray-950 text-white hover:bg-black shadow-lg'
                    }`}
                  >
                    <span>Confirmer la commande - {total.toLocaleString()} €</span>
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
