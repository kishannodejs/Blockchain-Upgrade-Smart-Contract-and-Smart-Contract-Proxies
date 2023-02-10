import React from 'react';
import Header from './components/Header';
import EternalStorage from './components/EternalStorage';
import Logic1 from './components/Logic1';
import Logic2 from './components/Logic2';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {


  return (
      <Router>
        <Header />
        <Routes>

          <Route path='/eternal' element={
            <EternalStorage />
          } />

          <Route path='/logic1' element={
            <Logic1 />
          } />

          <Route path='/logic2' element={
            <Logic2 />
          } />
        </Routes>
      </Router>
  );
}

export default App;
