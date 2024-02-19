import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const removeFromCart = (productId) => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (product, quantity) => {
    setCartItems(prevCartItems => {
   
      const existingItemIndex = prevCartItems.findIndex(item => item.id === product.id);

      if (existingItemIndex === -1) {
        return [...prevCartItems, { ...product, quantity }];
      }

      return prevCartItems.map((item, index) => 
        index === existingItemIndex ? { ...item, quantity } : item
      );
    });
  };


  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, removeFromCart, updateQuantity, totalPrice, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
