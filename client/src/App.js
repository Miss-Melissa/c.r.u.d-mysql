import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProductPage from './pages/addproductpage/addproductpage';
import UpdateProductPage from './pages/updateproductpage/updateproductpage';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import HomePage from './pages/homepage/homepage';
import ProductsPage from './pages/productspage/productspage';
import ProductPage from './pages/productpage/productpage';
import Cart from './components/cart/cart';


function App() {
  const initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    // Save cart items to local storage whenever it changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);


    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  return (
    <div className="App">
      <Header cartItemCount={cartItems.length} />
      <main className="main-content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/update-product/:id" element={<UpdateProductPage />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </div>
  );
}

export default App;
