import { createContext, useContext, useState, useEffect, useCallback } from 'react';

  const CartContext = createContext(null);
  const STORAGE_KEY = 'home_store_cart';
  let nextId = Date.now();

  function loadCart() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  export function CartProvider({ children }) {
    const [items, setItems] = useState(loadCart);

    useEffect(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
    }, [items]);

    const addToCart = useCallback((product, quantity = 1) => {
      setItems(prev => {
        const existing = prev.find(i => i.product.id === product.id);
        if (existing) {
          return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
        }
        return [...prev, { id: nextId++, product, quantity }];
      });
    }, []);

    const removeFromCart = useCallback((itemId) => {
      setItems(prev => prev.filter(i => i.id !== itemId));
    }, []);

    const updateQuantity = useCallback((itemId, quantity) => {
      if (quantity <= 0) {
        setItems(prev => prev.filter(i => i.id !== itemId));
      } else {
        setItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
      }
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
      <CartContext.Provider value={{ items, total, itemCount, addToCart, removeFromCart, updateQuantity, clearCart }}>
        {children}
      </CartContext.Provider>
    );
  }

  export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
  }