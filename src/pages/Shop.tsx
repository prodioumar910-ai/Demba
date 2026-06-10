import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  ChevronLeft, Search, Filter, ShoppingBag, Grid, Tv, AlignLeft, 
  Sparkles, Check, Info, Eye, Package, ArrowUpRight, Plus, Compass
} from 'lucide-react';
import Logo from '../components/Logo';

// Import local bespoke high-quality 3D luxury renders
import watchBespokeImg from '../assets/images/luxury_watch_1_1780858019019.png';
import glassesBespokeImg from '../assets/images/luxury_glasses_1_1780858032020.png';
import perfumeBespokeImg from '../assets/images/luxury_perfume_1_1780858046555.png';

// Extend product type to support rich details for our immersive showroom layout
interface RichProduct {
  id: string;
  name: string;
  price: number;
  category: 'watch' | 'glasses' | 'perfume';
  image: string;
  size?: string;
  gauge?: string;
  craftsman?: string;
  origin?: string;
  description?: string;
}

const productCatalog: RichProduct[] = [
  { 
    id: '1', 
    name: 'Demba Or Impérial', 
    price: 4500, 
    category: 'watch', 
    image: watchBespokeImg,
    size: '41 mm, Calibre Manufacture 3255',
    gauge: 'Réserve de marche 72h, Spiral Parachrom',
    craftsman: 'Maison Demba Atelier Genève',
    origin: 'Fabriqué en Suisse',
    description: 'Bâtie sur un châssis d\'or jaune 18 carats brossé à la main, cette montre incarne la quintessence du temps géométrique et de la haute horlogerie planétaire.' 
  },
  { 
    id: '2', 
    name: 'Demba Titane Doré', 
    price: 380, 
    category: 'glasses', 
    image: glassesBespokeImg,
    size: 'Taille Standard, Châssis Titane Souple',
    gauge: 'Verre Minéral Antireflet Catégorie 3',
    craftsman: 'Atelier Optique Cadre Milan',
    origin: 'Fabriqué en Italie',
    description: 'Une monture architecturalement allégée mêlant titane de qualité aérospatiale et un fin placage d\'or champagne de 12 microns pour une clarté lumineuse.' 
  },
  { 
    id: '3', 
    name: 'Élixir de Nuit Absolu', 
    price: 280, 
    category: 'perfume', 
    image: perfumeBespokeImg,
    size: '100 mL, Concentré d\'Exception',
    gauge: 'Famille Ambrée Boisée Cuirée',
    craftsman: 'Maître Parfumeur Grassais',
    origin: 'Élaboré à Grasse, France',
    description: 'Une partition de oud blanc d\'Asie mineure et de poivre noir, sublimée par de l\'ambre gris fossilisé. Une trace olfactive souveraine et indélébile.' 
  },
  { 
    id: '4', 
    name: 'Chronographe Classique', 
    price: 1250, 
    category: 'watch', 
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=500',
    size: '40 mm, Chronographe Automatique',
    gauge: 'Verre Saphir Inrayable, Cadran Noir',
    craftsman: 'Atelier Jura',
    origin: 'Suisse',
    description: 'Un hommage aux garde-temps pionniers des années 50, alliant cadran noir texturé et complications de chronographe de haute précision.'
  },
  { 
    id: '5', 
    name: 'Aviateur Nocturne', 
    price: 2100, 
    category: 'watch', 
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=500',
    size: '42 mm, Cadran Squelette',
    gauge: 'Étanche 100m, Bracelet Alligator Noir',
    craftsman: 'Atelier Neuchâtel',
    origin: 'Suisse',
    description: 'Le squelette dévoile un mouvement mécanique complexe poli à l\'or noir d\'une fluidité hypnotique.'
  },
  { 
    id: '6', 
    name: 'Cadre Acétate Noir', 
    price: 240, 
    category: 'glasses', 
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500',
    size: 'Forme Angulaire, Acétate Massif',
    gauge: 'Protection UV400 Polarisé',
    craftsman: 'Maison Belluno',
    origin: 'Italie',
    description: 'Un dessin rétro-moderne imposant aux lignes adoucies polies au tonneau pendant 72 heures pour un fini miroir.'
  },
  { 
    id: '7', 
    name: 'Royal Essence', 
    price: 180, 
    category: 'perfume', 
    image: 'https://images.unsplash.com/photo-1544441892-794166f4ce87?auto=format&fit=crop&q=80&w=500',
    size: '100 mL, Eau de Parfum',
    gauge: 'Bergamote Sauvage, Iris Noir',
    craftsman: 'Atelier Provence',
    origin: 'France',
    description: 'Bâtie sur la noblesse de l\'iris de Florence, une envolée piquante de bergamote cédant au velours poudré du cuir de Russie.'
  },
  { 
    id: '8', 
    name: 'Ambre Mystique', 
    price: 220, 
    category: 'perfume', 
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=500',
    size: '100 mL, Absolu d\'Ambre',
    gauge: 'Ambre rouge, Ciste Labdanum',
    craftsman: 'Atelier Grasse',
    origin: 'France',
    description: 'Une concentration mystique d\'ambre chaud résineux, rehaussée de gousses de vanille de Madagascar fondues au benjoin noir.'
  },
];

export default function Shop() {
  const { theme, displayStyle, setDisplayStyle, addToCart, cart, setIsCartOpen } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search, Category and Quick-View States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<RichProduct | null>(null);
  const [selectedPackaging, setSelectedPackaging] = useState<'standard' | 'velour' | 'cuir'>('standard');
  const [immersiveIndex, setImmersiveIndex] = useState(0);

  const filterParam = searchParams.get('category') || 'all';
  const filter = (filterParam === 'all' || filterParam === 'watch' || filterParam === 'glasses' || filterParam === 'perfume')
    ? filterParam
    : 'all';

  const setFilter = (newFilter: 'all' | 'watch' | 'glasses' | 'perfume') => {
    if (newFilter === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', newFilter);
    }
    setSearchParams(searchParams);
  };

  // Filter Catalog
  const baseFiltered = filter === 'all' 
    ? productCatalog 
    : productCatalog.filter(p => p.category === filter);

  const filteredProducts = baseFiltered.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.origin && p.origin.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Total Quantity added
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pb-20 bg-white text-black"
    >
      {/* 2026 High Fashion Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-500 py-6 px-4 sm:px-12 flex items-center justify-between bg-white/85 border-gray-200">
        <div className="flex items-center space-x-6 flex-1">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 transition-all group font-medium text-[10px] uppercase tracking-widest text-[#1C1C1D]"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>La Maison</span>
          </button>
          
          {/* Main Horizontal Categories Filter */}
          <div className="hidden lg:flex items-center space-x-6 pl-4 border-l border-neutral-200">
            {(['all', 'watch', 'glasses', 'perfume'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[9px] uppercase tracking-[0.25em] font-semibold transition-all py-1 cursor-pointer ${
                  filter === cat 
                    ? 'text-black border-b border-black font-bold'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {cat === 'all' ? 'Tous' : cat === 'watch' ? 'Horlogerie' : cat === 'glasses' ? 'Optique' : 'Parfums'}
              </button>
            ))}
          </div>
        </div>

        {/* Scaled brand insignia */}
        <Logo className="scale-65 origin-center hidden sm:block md:scale-75" />

        {/* Right side controls: Search, Layout Selection indicators, Shopping Bag */}
        <div className="flex items-center justify-end space-x-4 sm:space-x-6 flex-1">
          {/* Quick Search input */}
          <div className="relative max-w-[120px] sm:max-w-[180px] group">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest outline-none focus:ring-1 focus:ring-black transition-all bg-white border text-black border-gray-200"
            />
            <Search size={12} className="absolute left-3 top-2.5 text-neutral-500" />
          </div>

          {/* Inline Layout Switcher directly in the toolbar as responsive icons */}
          <div className="hidden md:flex items-center space-x-1.5 p-1 rounded-full border border-gray-200 bg-gray-50">
            {[
              { id: 'bento', icon: Grid, label: 'Bento' },
              { id: 'immersive', icon: Tv, label: 'Galerie' },
              { id: 'studio', icon: AlignLeft, label: 'Studio' }
            ].map((style) => {
              const IconComp = style.icon;
              return (
                <button
                  key={style.id}
                  onClick={() => setDisplayStyle(style.id as any)}
                  className={`p-1.5 rounded-full transition-all ${
                    displayStyle === style.id
                      ? 'bg-black text-white shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                  title={`${style.label} Layout`}
                >
                  <IconComp size={12} />
                </button>
              );
            })}
          </div>

          {/* Cart Bag button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 rounded-full flex items-center justify-center transition-all bg-black text-white hover:bg-neutral-850 shadow-md"
          >
            <ShoppingBag size={15} strokeWidth={2} />
            <AnimatePresence>
              {totalCartItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-5 h-5 text-[9px] font-mono font-bold rounded-full flex items-center justify-center border bg-white border-black text-black"
                >
                  {totalCartItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Responsive mobile sub-filtering category bar */}
      <div className="flex lg:hidden overflow-x-auto gap-3 px-4 py-3 border-b scrollbar-none bg-gray-50 border-gray-200">
        {(['all', 'watch', 'glasses', 'perfume'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-[8.5px] uppercase tracking-widest font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              filter === cat
                ? 'bg-gray-900 text-white'
                : 'bg-transparent text-gray-400 hover:text-gray-500'
            }`}
          >
            {cat === 'all' ? 'Tous' : cat === 'watch' ? 'Montres' : cat === 'glasses' ? 'Lunettes' : 'Parfums'}
          </button>
        ))}
      </div>

      <main className="max-w-[1300px] mx-auto px-4 sm:px-12 py-16">
        
        {/* Dynamic Showcase Viewport */}
        {filteredProducts.length === 0 ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4">
            <span className="text-neutral-500 text-sm">AUCUN PIÈCE CORRESPONDANTE</span>
            <button 
              onClick={() => { setSearchQuery(''); setFilter('all'); }}
              className="text-xs uppercase font-bold underline tracking-widest text-[#E6C280]"
            >
              Réouvrir l'éventail complet
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            
            {/* 1. LAYOUT: BENTO LUXE GRID */}
            {displayStyle === 'bento' && (
              <motion.div
                key="bento-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {/* Special magazine-style Editorial Text Tile */}
                <div className="p-8 border rounded-[2rem] flex flex-col justify-between hidden lg:flex aspect-square bg-white border-gray-200/50">
                  <div className="space-y-4 text-left">
                    <Compass size={24} className="text-gray-900" />
                    <h3 className="text-xl font-light font-serif leading-snug tracking-wide">
                      Compositions de <br /> style et d’ingénierie.
                    </h3>
                  </div>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
                    Auteur d’un style d’affichage d’avant-garde d’Atelier.
                  </p>
                </div>

                {filteredProducts.map((product, i) => {
                  // Asymmetric featured cards: Flagships takes more prominence
                  const isFeatured = product.id === '1' || product.id === '2';
                  
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -4 }}
                      onClick={() => setSelectedProduct(product)}
                      className="group rounded-[2rem] border overflow-hidden flex flex-col justify-between p-6 cursor-pointer md:col-span-1 h-[450px] transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.02)] bg-white hover:border-gray-900 border-gray-200/50 hover:shadow-lg"
                    >
                      {/* Product Header */}
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-mono tracking-widest text-neutral-500 uppercase">
                          {product.origin || 'Maison Demba'}
                        </span>
                        <div className="p-1.5 rounded-full bg-gray-50 text-gray-500">
                          <Sparkles size={11} />
                        </div>
                      </div>

                      {/* Product Bespoke Image with deep lens reflection blob */}
                      <div className="h-[55%] w-full flex items-center justify-center relative my-4">
                        <div className="absolute w-24 h-24 rounded-full blur-[35px] opacity-15 bg-amber-205" />
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-[85%] object-contain transition-transform duration-750 ease-out group-hover:scale-105 group-hover:rotate-2 drop-shadow-[0_15px_22px_rgba(0,0,0,0.12)]"
                        />
                      </div>

                      {/* Info & CTA Footer */}
                      <div className="border-t pt-4 border-neutral-500/10 flex items-end justify-between">
                        <div className="text-left">
                          <h3 className="text-[12.5px] font-semibold uppercase tracking-widest mb-1.5 truncate max-w-[200px]">
                            {product.name}
                          </h3>
                          <span className="text-[11.5px] font-mono text-amber-650">
                            {product.price.toLocaleString()} €
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-[8.5px] tracking-widest uppercase font-bold transition-all bg-gray-950 text-white group-hover:bg-black">
                          <span>Détails</span>
                          <ArrowUpRight size={10} strokeWidth={2.5} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* 2. LAYOUT: GALERIE IMMERSIVE (Virtual Showroom) */}
            {displayStyle === 'immersive' && (
              <motion.div
                key="immersive-showroom"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                {(() => {
                  // Bound index range
                  const currentIdx = Math.min(immersiveIndex, filteredProducts.length - 1);
                  const activeProd = filteredProducts[currentIdx] || filteredProducts[0];
                  if (!activeProd) return null;

                  return (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                      
                      {/* Left Block: Infinite visual presentation frame */}
                      <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 rounded-[2.5rem] border aspect-square lg:aspect-auto min-h-[480px] lg:h-[650px] relative transition-all duration-700 bg-white border-gray-200/50 shadow-md">
                        {/* Dynamic background badge */}
                        <div className="absolute top-8 left-8 sm:top-12 sm:left-12 flex items-center space-x-2 z-10">
                          <Compass size={18} className="text-neutral-900 shrink-0" />
                          <span className="text-[8px] font-mono tracking-[0.3em] uppercase">Catalogue Exclusif</span>
                        </div>

                        {/* Center focus item with deep aura glow */}
                        <div className="flex-1 w-full flex items-center justify-center relative shrink-0">
                          <div className="absolute w-44 h-44 rounded-full blur-[60px] opacity-25 scale-125 bg-amber-100" />
                          <motion.img
                            key={activeProd.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1.02, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            src={activeProd.image}
                            alt={activeProd.name}
                            className="max-h-[60%] max-w-[85%] object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.22)]"
                          />
                        </div>

                        {/* Slide Selector Buttons */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-500/10 z-10">
                          <button
                            disabled={currentIdx === 0}
                            onClick={() => setImmersiveIndex(prev => Math.max(0, prev - 1))}
                            className="px-4 py-2 rounded-full border text-[9px] uppercase tracking-widest font-bold font-mono transition-colors disabled:opacity-20 border-gray-200 hover:bg-gray-100"
                          >
                            Élément Précédent
                          </button>
                          
                          <span className="text-[10px] font-mono text-neutral-400">
                            {currentIdx + 1} / {filteredProducts.length}
                          </span>

                          <button
                            disabled={currentIdx === filteredProducts.length - 1}
                            onClick={() => setImmersiveIndex(prev => Math.min(filteredProducts.length - 1, prev + 1))}
                            className="px-4 py-2 rounded-full border text-[9px] uppercase tracking-widest font-bold font-mono transition-colors disabled:opacity-20 border-gray-200 hover:bg-gray-100"
                          >
                            Élément Suivant
                          </button>
                        </div>
                      </div>

                      {/* Right Block: Technical Luxury Specs */}
                      <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-12 rounded-[2.5rem] border text-left transition-all duration-700 bg-white border-gray-200/50">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <span className="text-[9px] uppercase tracking-[0.35em] bg-gray-100 text-gray-800 font-mono px-2 py-0.5 rounded">
                              {activeProd.origin || 'DEMBA PARIS'}
                            </span>
                            <h2 className="text-3xl font-extralight font-serif tracking-wide leading-tight uppercase text-black">
                              {activeProd.name}
                            </h2>
                            <p className="text-xl font-mono text-amber-650 mt-2">
                              {activeProd.price.toLocaleString()} €
                            </p>
                          </div>

                          <div className={`h-[1px] w-full ${theme === 'obsidian' ? 'bg-white/5' : 'bg-gray-100'}`} />

                          {/* Descriptive narrative */}
                          <p className="text-xs leading-relaxed text-gray-500 tracking-wide font-light">
                            {activeProd.description || 'Une création somptueuse qui redéfinit les canons esthétiques de nos collections, exécutée entièrement selon les secrets de notre manufacture.'}
                          </p>

                          {/* Technical attributes list */}
                          <div className="space-y-3 pt-2">
                            <div className="flex justify-between items-center text-[10px] tracking-wider border-b border-neutral-500/5 pb-2">
                              <span className="text-neutral-500 uppercase font-mono">Dimensions & Châssis :</span>
                              <span className="font-semibold">{activeProd.size || 'Unique'}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] tracking-wider border-b border-neutral-500/5 pb-2">
                              <span className="text-neutral-500 uppercase font-mono">Spécifications Mécaniques :</span>
                              <span className="font-semibold truncate max-w-[200px]">{activeProd.gauge || 'Manufacture'}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] tracking-wider border-b border-neutral-500/5 pb-2">
                              <span className="text-neutral-500 uppercase font-mono">Lieu d'Ouvrage d'Art :</span>
                              <span className="font-semibold">{activeProd.craftsman || 'Atelier Private'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Order button and packaging options */}
                        <div className="pt-8 space-y-4">
                          <button
                            onClick={() => setSelectedProduct(activeProd)}
                            className="w-full py-4 text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 bg-gray-950 text-white hover:bg-black shadow-md"
                          >
                            <span>Configurer l'Écrin & Commander</span>
                            <ArrowUpRight size={14} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* 3. LAYOUT: STUDIO ROW CONTEMPORARY ROW LIST */}
            {displayStyle === 'studio' && (
              <motion.div
                key="studio-runway"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="divide-y text-left divide-gray-200"
              >
                {/* Column descriptors */}
                <div className="flex items-center justify-between pb-4 font-mono text-[8px] uppercase tracking-[0.4em] text-neutral-500">
                  <div className="w-[45%]">PIÈCE DE HAUTE COUTURE</div>
                  <div className="w-[15%] hidden sm:block text-center">CATÉGORIE</div>
                  <div className="w-[20%] hidden sm:block text-right">DISTINCTION ORIGINE</div>
                  <div className="w-[20%] text-right font-mono">PRIX D'OUVRAGE</div>
                </div>

                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setSelectedProduct(product)}
                    className="flex items-center justify-between py-6 sm:py-8 cursor-pointer group hover:pl-2 transition-all outline-none"
                  >
                    {/* Name & Mini Preview Thumbnail */}
                    <div className="w-[45%] flex items-center space-x-6 min-w-0">
                      <div className="w-12 h-14 shrink-0 overflow-hidden bg-gray-50 transition-colors relative border border-gray-100">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold uppercase tracking-widest truncate group-hover:text-black transition-colors">
                          {product.name}
                        </h3>
                        <span className="text-[9px] text-gray-500 font-mono mt-1 block">Réf. DM-0{product.id}</span>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="w-[15%] hidden sm:block text-center text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
                      {product.category === 'watch' ? 'Horlogerie' : product.category === 'glasses' ? 'Optique' : 'Maison Parfum'}
                    </div>

                    {/* Heritage */}
                    <div className="w-[20%] hidden sm:block text-right text-[10px] text-gray-400 font-light truncate">
                      {product.origin || 'Atelier d\'Artisan'}
                    </div>

                    {/* Price & CTA */}
                    <div className="w-[20%] flex flex-col items-end text-right font-mono">
                      <span className="text-sm font-semibold text-black transition-colors">
                        {product.price.toLocaleString()} €
                      </span>
                      <span className="text-[7.5px] uppercase font-bold tracking-widest underline mt-1 opacity-0 group-hover:opacity-100 text-neutral-500 group-hover:text-black transition-all">
                        ACHETER DÉTAILS
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        )}
      </main>

      {/* QUICK VIEW CONFIGURATION MODAL (Product Personalizer Popup) */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 z-50 bg-black backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl p-6 sm:p-10 rounded-[2.5rem] border shadow-[0_30px_90px_rgba(0,0,0,0.15)] z-50 overflow-hidden font-sans bg-white text-black border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-h-[85vh] overflow-y-auto pr-1">
                
                {/* Visual Image Preview Panel */}
                <div className="md:col-span-5 p-6 rounded-3xl flex items-center justify-center relative border aspect-square bg-white border-gray-155">
                  <div className="absolute w-32 h-32 rounded-full blur-[45px] opacity-15 bg-amber-250" />
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="max-h-full max-w-[90%] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
                  />
                  <span className="absolute bottom-4 left-4 text-[7px] font-mono tracking-widest text-neutral-500 uppercase">
                    RÉSERVE PRIVÉE • CERTIFIÉE
                  </span>
                </div>

                {/* Configurations Panel */}
                <div className="md:col-span-7 space-y-6 text-left">
                  <div className="space-y-1">
                    <h2 className="text-2xl sm:text-3xl font-extralight font-serif tracking-wide uppercase text-black">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-xl font-mono text-amber-650 mt-1">
                      {selectedProduct.price.toLocaleString()} €
                    </p>
                  </div>

                  <p className="text-xs leading-relaxed text-gray-650 font-light">
                    {selectedProduct.description || 'Chaque création est une démonstration technique exceptionnelle d\'ornements fins façonnés par la main de nos orfèvres dévoués.'}
                  </p>

                  {/* Packaging Customizer selection */}
                  <div className="space-y-3">
                    <span className="text-[9px] uppercase tracking-widest font-semibold text-neutral-550 flex items-center space-x-1.5">
                      <Package size={12} className="text-gray-905" />
                      <span>Choix de l'Écrin Protecteur</span>
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                       {[
                        { id: 'standard', name: 'Signature', price: 'Inclus', desc: 'Boîtier en feutre poli originel d\'Atelier' },
                        { id: 'velour', name: 'Velours Roy', price: '+15 €', desc: 'Housse bleu impérial brodée de fils dorés (monogramme)' },
                        { id: 'cuir', name: 'Malle Cuir', price: '+45 €', desc: 'Coffret en cuir patiné havane, gravure à chaud d\'initiales' }
                       ].map((pack) => (
                        <button
                          key={pack.id}
                          type="button"
                          onClick={() => setSelectedPackaging(pack.id as any)}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 ${
                            selectedPackaging === pack.id
                              ? 'border-gray-950 bg-gray-50 text-gray-950 shadow-sm'
                              : 'border-gray-200 bg-transparent text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider flex justify-between items-baseline">
                              <span>{pack.name}</span>
                              <span className="text-[8px] font-mono text-amber-650 font-semibold">{pack.price}</span>
                            </div>
                            <p className="text-[8.5px] text-gray-550 mt-1 line-clamp-2 leading-relaxed">{pack.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit controls */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-neutral-500/10">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct, selectedPackaging);
                        setSelectedProduct(null);
                      }}
                      className="w-full sm:flex-1 py-4 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center space-x-2 rounded-xl transition-all bg-gray-950 text-white hover:bg-black"
                    >
                      <ShoppingBag size={14} />
                      <span>Ajouter à mon Édition</span>
                    </button>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="w-full sm:w-auto px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-colors border-gray-200 hover:bg-gray-100 text-gray-500"
                    >
                      Retourner
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
