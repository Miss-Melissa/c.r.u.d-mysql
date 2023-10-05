import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context to manage the cart state
const CartContext = createContext();

// Create a provider component to wrap your application and provide cart functionality
export function CartProvider({ children }) {
  // Initialize the cartItems state with an empty array
  const [cartItems, setCartItems] = useState([]);

  // Use useEffect to load cart items from local storage when the component mounts
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
  }, []);

  // Use another useEffect to save cart items to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Define functions to interact with the cart
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // If the product is already in the cart, increment its quantity
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const incrementItem = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
  
    if (existingItem) {
      // If the product is already in the cart, increment its quantity
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  

  const decrementItem = (product) => {
    // Decrement the quantity of a product in the cart or remove it
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const removeFromCart = (product) => {
    // Remove a product from the cart
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  // Provide the cart state and functions to the wrapped components
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        incrementItem,
        decrementItem,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Create a custom hook to access the cart context from any component
export function useCart() {
  return useContext(CartContext);
}
