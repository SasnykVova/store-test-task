import React from 'react';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Store from './components/Store/Store';
import AddProduct from './components/Store/AddProduct/AddProduct';

const App: React.FC = () => {
  return (
    <div className='app'>
      <Header/>
      <div className='main'>
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Store/>} />    
            <Route path="/addProduct" element={<AddProduct/>} />    
            </Routes>
          </BrowserRouter>
      </div>
      <div className='footer'>Footer</div>
    </div>
  );
}

export default App;

