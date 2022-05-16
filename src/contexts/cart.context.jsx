import { createContext, useState } from "react";

// create context
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

// create provider
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };

  // return CartContext.Provider passing down the value and children
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
