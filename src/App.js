import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Homepage from './containers/Homepage'
import Modal from './components/Modal';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/all-banks" element={<Homepage />} />
          {/* <Route path="/bank-details/:city/:ifsc" element={<Modal />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
