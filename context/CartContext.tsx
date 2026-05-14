'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  size: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;

  removeFromCart: (
    id: string,
    size: string
  ) => void;

  clearCart: () => void;

  cartCount: number;
};

const CartContext =
  createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(item: CartItem) {
    setCart((prev) => {
      const existingItem = prev.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size
      );

      // If same product + same size already exists
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size
            ? {
                ...cartItem,
                quantity:
                  cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      // Otherwise add new item
      return [...prev, item];
    });
  }

  function removeFromCart(
    id: string,
    size: string
  ) {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size
          )
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    );
  }

  return context;
}