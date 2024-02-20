import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const removeFromCart = (productId) => {
    deleteCart(productId);
  };

  const deleteCart = (productId) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (item) => item.id === productId
      );
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems.splice(existingItemIndex, 1);
        return updatedCartItems;
      }
      return prevCartItems;
    });
  };

  const updateQuantity = (product, quantity) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex === -1) {
        return [...prevCartItems, { ...product, quantity, inCart: true }];
      }

      return prevCartItems.map((item, index) =>
        index === existingItemIndex ? { ...item, quantity, inCart: true } : item
      );
    });
  };

  const addToCart = (product, quantity) => {
    console.log(product);
    updateQuantity(product, quantity);
  };

  useEffect(() => {
    calcTotalPrice();
    calcTotalQuantity();
    console.log(cartItems);
  }, [cartItems]);

  const calcTotalPrice = () => {
    let tp = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalCost(tp);
  };

  const calcTotalQuantity = () => {
    setTotalQuantity(
      cartItems.reduce((total, item) => total + item.quantity, 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalCost,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
