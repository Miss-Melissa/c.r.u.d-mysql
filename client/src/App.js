import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProductPage from './pages/addproductpage/addproductpage';
import UpdateProductPage from './pages/updateproductpage/updateproductpage';
import Header from './components/header/header';

function App() {
  return (
    <div className="App">
      <Header />
        <BrowserRouter>
      <Routes>
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/update-product/:id" element={<UpdateProductPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
