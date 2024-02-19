import React from 'react';
import { CartProvider } from './contexts/CartContext';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
  return (
    <CartProvider>    
        <Navbar />
        <Header />
        <ProductList />
        <Footer />
    </CartProvider>
  );
};

export default App;
