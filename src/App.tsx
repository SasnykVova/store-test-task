import React from 'react';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Store from './components/Store/Store';
import AddProduct from './components/Store/AddProduct/AddProduct';
import ProductDetails from './components/Store/ProductDetails/ProductDetails';

const App: React.FC = () => {
  return (
    <div className='app'>
      <Header/>
      <div className='main'>
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Store/>} />    
            <Route path="/addProduct" element={<AddProduct/>} />    
            <Route path="/products/:id" element={<ProductDetails/>}/>    
            </Routes>
          </BrowserRouter>
      </div>
      <div className='footer'>Footer</div>
    </div>
  );
}

export default App;

