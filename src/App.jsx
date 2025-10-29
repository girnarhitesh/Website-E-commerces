import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Products from "./assets/Componetcs/ProductsSection/Products";
import CartPage from "./assets/Componetcs/ProductsSection/CartPage";
import { CartProvider } from "./assets/Componetcs/ProductsSection/CartContext";
import Homepage from "./assets/Componetcs/Homepage/Homepage";
import Navigationsection from "./assets/Componetcs/Navigationsection/Navigation";
import Productspage from "./assets/Pages/Productspage/Productspage";
import ProductDetails from "./assets/Pages/Productspage/ ProductDetails";
import OfferPage from "./assets/Componetcs/OfferPage/OfferPage";
import LoginPage from "./assets/Componetcs/Logingpage/Login";

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Navigationsection />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/products' element={<Productspage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path="/offer" element={<OfferPage />} /> 
               <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;