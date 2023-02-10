import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Proxy from './components/Proxy';
import Logic1 from './components/Logic1';
import Logic2 from './components/Logic2';
import ProxyWithLogic from './components/ProxyWithLogic';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MetaProvider } from './MetamaskLogin';

function App() {
  const [tx, setTx] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [receipt, setReceipt] = useState({});

  return (
    <MetaProvider>
      <Router>
        <Header />
        <Routes>
        <Route path='/' element={
            <Home />
          } />
          <Route path='/proxy' element={
            <Proxy backdrop={backdrop} setBackdrop={setBackdrop} tx={tx} setTx={setTx} receipt={receipt} setReceipt={setReceipt}/>
          } />

          <Route path='/logic1' element={
            <Logic1 backdrop={backdrop} setBackdrop={setBackdrop} tx={tx} setTx={setTx} receipt={receipt} setReceipt={setReceipt}/>
          } />
          <Route path='/logic2' element={
            <Logic2 backdrop={backdrop} setBackdrop={setBackdrop} tx={tx} setTx={setTx} receipt={receipt} setReceipt={setReceipt}/>
          } />
          
        
        <Route path='/proxyWlogic' element={
            <ProxyWithLogic backdrop={backdrop} setBackdrop={setBackdrop} tx={tx} setTx={setTx} receipt={receipt} setReceipt={setReceipt}/>
          } />
        </Routes>
      </Router>
    </MetaProvider>
  );
}

export default App;
