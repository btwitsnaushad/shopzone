import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast'; // <-- Naya Toast Import

export const CartContext = createContext();

export function CartProvider({ children }) {
  // LocalStorage se cart data lana
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shopzone_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Cart update hone par LocalStorage mein save karna
  useEffect(() => {
    localStorage.setItem('shopzone_cart', JSON.stringify(cart));
  }, [cart]);

  // Item add karne ka logic
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // NAYA: Item add hote hi mast sa toast aayega product ke naam ke sath!
    toast.success(`${product.title} added to cart!`);
  };

  // Quantity badhane ka function
  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Quantity ghatane ka function (Agar 0 hui toh remove ho jayega)
  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => item.quantity > 0) 
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty }}>
      {children}
    </CartContext.Provider>
  );
}