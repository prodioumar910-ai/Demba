import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

export type LuxuryTheme = 'obsidian' | 'ivory' | 'emerald';
export type DisplayStyle = 'bento' | 'immersive' | 'studio';

export interface CartItem {
  product: Product;
  quantity: number;
  packaging: string; // 'standard' | 'velour' | 'cuir'
}

interface ThemeContextProps {
  theme: LuxuryTheme;
  setTheme: (theme: LuxuryTheme) => void;
  toggleTheme: () => void;
  displayStyle: DisplayStyle;
  setDisplayStyle: (style: DisplayStyle) => void;
  cart: CartItem[];
  addToCart: (product: Product, packaging?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<LuxuryTheme>('obsidian');
  const [displayStyle, setDisplayStyle] = useState<DisplayStyle>('bento');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync theme to root class tag for potential global custom style references
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('theme-obsidian', 'theme-ivory', 'theme-emerald');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const setTheme = (newTheme: LuxuryTheme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      if (prev === 'obsidian') return 'ivory';
      if (prev === 'ivory') return 'emerald';
      return 'obsidian';
    });
  };

  const addToCart = (product: Product, packaging: string = 'standard') => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id && item.packaging === packaging);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.packaging === packaging
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, packaging }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        displayStyle,
        setDisplayStyle,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
