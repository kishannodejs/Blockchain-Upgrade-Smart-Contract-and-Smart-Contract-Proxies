import React, { useState } from 'react';
import Header from './components/Header';
import Proxy from './components/Proxy';
import Logic1 from './components/Logic1';
import Logic2 from './components/Logic2';
import ProxyWithLogic from './components/ProxyWithLogic';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {


  return (
      <Router>
        <Header />
        <Routes>

          <Route path='/proxy' element={
            <Proxy />
          } />

          <Route path='/logic1' element={
            <Logic1 />
          } />

          <Route path='/logic2' element={
            <Logic2 />
          } />
        
        <Route path='/proxyWlogic' element={
            <ProxyWithLogic />
          } />
        </Routes>
      </Router>
  );
}

export default App;
