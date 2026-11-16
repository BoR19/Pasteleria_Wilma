import { useState, useEffect } from 'react';
import { CartItem, Product, CustomizationOptions } from '../types/bakery';
import { calculateUnitPrice } from '../utils/bakeryHelpers';

const CART_STORAGE_KEY = 'wilma_cart_items';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to local storage', e);
    }
  }, [items]);

  const addToCart = (
    product: Product,
    customization: CustomizationOptions,
    quantity: number = 1
  ) => {
    const unitPrice = calculateUnitPrice(product.precio, customization);
    const cartItemId = `${product.id}-${customization.tamano}-${customization.saborBizcocho.slice(0, 5)}-${customization.relleno.slice(0, 5)}-${Date.now().toString(36)}`;

    const newItem: CartItem = {
      cartItemId,
      product,
      quantity,
      customization,
      unitPrice,
      subtotal: unitPrice * quantity
    };

    setItems((prev) => [newItem, ...prev]);
    setIsOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              subtotal: item.unitPrice * newQty
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount
  };
}
