import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProductPage from './pages/addproductpage/addproductpage';
import UpdateProductPage from './pages/updateproductpage/updateproductpage';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import HomePage from './pages/homepage/homepage';
import ProductsPage from './pages/productspage/productspage';
import ProductPage from './pages/productpage/productpage';


function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/update-product/:id" element={<UpdateProductPage />} />
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </div>
  );
}

export default App;
